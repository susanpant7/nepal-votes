using System.Text;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.ElectoralConstituencies;
using NepalVotes.Domain.ElectoralGeographies;
using NepalVotes.Engine.Models;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Engine.Repositories;

public class ConstituencyDataLoadRepository (ApplicationDbContext context) : IConstituencyDataLoadRepository
{
    public async Task ProcessElectoralMappingAsync(string jsonFilePath)
{
    if (!File.Exists(jsonFilePath)) return;

    var jsonContent = await File.ReadAllTextAsync(jsonFilePath);
    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    var districtData = JsonSerializer.Deserialize<List<DistrictJsonModel>>(jsonContent, options);

    // 1. Prefetch all districts with their hierarchies for speed (In-memory lookup)
    var allDistricts = await context.Districts
        .Include(d => d.Municipalities)
        .ThenInclude(m => m.Wards)
        .ToListAsync();

    await using var transaction = await context.Database.BeginTransactionAsync();

    try
    {
        if (districtData != null)
        {
            foreach (var distJson in districtData)
            {
                // Find district by English Name
                var district = allDistricts.FirstOrDefault(d =>
                    d.DistrictNameEn.Equals(distJson.DistrictName, StringComparison.OrdinalIgnoreCase));

                if (district == null) continue;

                foreach (var constJson in distJson.Constituencies)
                {
                    // Generate Standardized Names
                    var constituencyNameEn = $"{district.DistrictNameEn} {constJson.ConstituencyNumber}";
                    var constituencyNameNp = $"{district.DistrictNameNp} {ToNepaliDigits(constJson.ConstituencyNumber)}";

                    // 2. Upsert Constituency (Check if exists, otherwise create)
                    var constituency = await context.Constituencies
                        .FirstOrDefaultAsync(c => c.ConstituencyNameEn == constituencyNameEn);

                    if (constituency == null)
                    {
                        constituency = new Constituency
                        {
                            ConstituencyNameEn = constituencyNameEn,
                            ConstituencyNameNp = constituencyNameNp,
                            // Ensure the constituency is linked to the District if your schema allows
                            // DistrictId = district.DistrictId 
                        };
                        context.Constituencies.Add(constituency);
                        // Save immediately so we have the ID for the Ward foreign key
                        await context.SaveChangesAsync(); 
                    }

                    // 3. Map Municipalities and Wards
                    foreach (var muniJson in constJson.MunicipalityAndWards)
                    {
                        IEnumerable<Municipality> targetMunicipalities;

                        // Handle cases where the whole district is one constituency
                        if (muniJson.MunicipalityName.Equals("All", StringComparison.OrdinalIgnoreCase) || 
                            muniJson.MunicipalityName.Equals("All Local Units", StringComparison.OrdinalIgnoreCase))
                        {
                            targetMunicipalities = district.Municipalities;
                        }
                        else
                        {
                            targetMunicipalities = district.Municipalities.Where(m => 
                                m.MunicipalityNameEn.Equals(muniJson.MunicipalityName, StringComparison.OrdinalIgnoreCase));
                        }

                        foreach (var municipality in targetMunicipalities)
                        {
                            // Filter wards based on JSON (All vs Specific numbers)
                            var wardsToUpdate = muniJson.AllWards
                                ? municipality.Wards
                                : municipality.Wards.Where(w => muniJson.Wards.Contains(w.WardNumber));

                            foreach (var ward in wardsToUpdate)
                            {
                                // IMPORTANT: Set the foreign key on the Ward table
                                ward.ConstituencyId = constituency.ConstituencyId;
                            }
                        }
                    }
                }
            }
        }

        // Final Batch Update for all modified Ward entities
        await context.SaveChangesAsync();
        await transaction.CommitAsync();
    }
    catch (Exception ex)
    {
        await transaction.RollbackAsync();
        // Log ex if needed
        throw;
    }
}

    // Helper to convert numbers (e.g., 1 to १, 12 to १२)
    private string ToNepaliDigits(int number)
    {
        string engNumber = number.ToString();
        var nepaliDigits = new Dictionary<char, char>
        {
            {'0', '०'}, {'1', '१'}, {'2', '२'}, {'3', '३'}, {'4', '४'},
            {'5', '५'}, {'6', '६'}, {'7', '७'}, {'8', '८'}, {'9', '९'}
        };

        var result = new StringBuilder();
        foreach (char c in engNumber)
        {
            result.Append(nepaliDigits.GetValueOrDefault(c, c));
        }
        return result.ToString();
    }
}