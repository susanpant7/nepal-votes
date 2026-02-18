using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.Candidates;
using NepalVotes.Engine.Models;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Engine.Repositories;

public class CandidateDataLoadRepository (ILogger<CandidateDataLoadRepository> logger,
    ApplicationDbContext context) : ICandidateDataLoadRepository
{
    private const string IndependentPartyName = "Independent";

    public async Task ImportCandidatesFromJsonAsync(string jsonFilePath)
    {
        var jsonText = await File.ReadAllTextAsync(jsonFilePath);
        var dtos = JsonSerializer.Deserialize<List<CandidateJsonDto>>(jsonText,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        if (dtos is null || dtos.Count == 0)
        {
            logger.LogWarning("No candidates found in {File}.", jsonFilePath);
            return;
        }

        // ── 2. Build lookup caches (avoid N+1 inside the loop) ───────────────
        var politicalPartyLookup = await context.PoliticalParties
            .AsNoTracking()
            .ToDictionaryAsync(p => p.PoliticalPartyNameEn.Trim(), p => p.PoliticalPartyId);

        // Constituency name in DB is stored as "DistrictNameEn ConstituencyNumber"
        // e.g. "Taplejung 1"
        var constituencyLookup = await context.Constituencies
            .AsNoTracking()
            .ToDictionaryAsync(c => c.ConstituencyNameEn.Trim(), c => c.ConstituencyId);

        // User lookup: VoterIdNumber is stored as string in the User table.
        // The JSON CandidateId IS the VoterIdNumber.
        var voterIdSet = dtos.Select(d => d.CandidateId.ToString()).ToHashSet();
        var userLookup = await context.Users
            .AsNoTracking()
            .Where(u => voterIdSet.Contains(u.VoterIdNumber))
            .ToDictionaryAsync(u => u.VoterIdNumber, u => u.UserId);

        // ── 3. Transaction ────────────────────────────────────────────────────
        await using var transaction = await context.Database.BeginTransactionAsync();
        try
        {
            int inserted = 0;
            int skipped  = 0;

            foreach (var dto in dtos)
            {
                var voterIdNumber = dto.CandidateId.ToString();

                // ── 3a. Resolve User ─────────────────────────────────────────
                if (!userLookup.TryGetValue(voterIdNumber, out var userId))
                {
                    logger.LogWarning(
                        "No User found for VoterIdNumber={VoterIdNumber} (CandidateId={CandidateId}, Name={Name}). Skipping.",
                        voterIdNumber, dto.CandidateId, dto.CandidateNameEn);
                    skipped++;
                    continue;
                }

                // ── 3b. Resolve Constituency ─────────────────────────────────
                var constituencyKey = $"{dto.DistrictNameEn.Trim()} {dto.ConstituencyNumber}";
                if (!constituencyLookup.TryGetValue(constituencyKey, out var constituencyId))
                {
                    logger.LogWarning(
                        "No Constituency found for '{ConstituencyKey}' (CandidateId={CandidateId}). Skipping.",
                        constituencyKey, dto.CandidateId);
                    skipped++;
                    continue;
                }

                // ── 3c. Resolve Political Party ──────────────────────────────
                var isIndependent = string.Equals(
                    dto.PoliticalPartyNameEn.Trim(),
                    IndependentPartyName,
                    StringComparison.OrdinalIgnoreCase);

                int? politicalPartyId = null;
                if (!isIndependent)
                {
                    if (!politicalPartyLookup.TryGetValue(dto.PoliticalPartyNameEn.Trim(), out var partyId))
                    {
                        logger.LogWarning(
                            "No PoliticalParty found for '{PartyName}' (CandidateId={CandidateId}). Skipping.",
                            dto.PoliticalPartyNameEn, dto.CandidateId);
                        skipped++;
                        continue;
                    }
                    politicalPartyId = partyId;
                }

                // ── 3d. Build Candidate entity ───────────────────────────────
                var candidate = new Candidate
                {
                    UserId           = userId,
                    PoliticalPartyId = politicalPartyId,
                    IsIndependent    = isIndependent,
                    ConstituencyId   = constituencyId,
                    CandidateImageId = dto.CandidateId,   // JSON CandidateId → image key
                };

                context.Candidates.Add(candidate);

                // We need the generated CandidateId before creating the symbol,
                // so flush this one candidate now (still inside the transaction).
                await context.SaveChangesAsync();

                // ── 3e. Create CandidateSymbol for independent candidates ─────
                if (isIndependent)
                {
                    var symbol = new CandidateSymbol
                    {
                        CandidateSymbolNameEn = dto.CandidateSymbolNameEn,
                        CandidateSymbolNameNp = dto.CandidateSymbolNameNp,
                    };

                    context.CandidateSymbols.Add(symbol);
                    await context.SaveChangesAsync();

                    // Link symbol back to candidate
                    candidate.CandidateSymbolId = symbol.CandidateSymbolId;
                    await context.SaveChangesAsync();
                }

                inserted++;
            }

            await transaction.CommitAsync();

            logger.LogInformation(
                "Candidate seeding complete. Inserted={Inserted}, Skipped={Skipped}, Total={Total}.",
                inserted, skipped, dtos.Count);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            logger.LogError(ex, "Candidate seeding failed. Transaction rolled back.");
            throw;
        }
    }
}