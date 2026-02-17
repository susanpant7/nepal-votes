using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.Candidates;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.Candidates;

public class CandidateRepository(ApplicationDbContext context) : ICandidateRepository
{
    public async Task<IEnumerable<Candidate>> GetAllByConstituencyIdAsync(int? constituencyId = null)
    {
        var query = context.Candidates
            .Include(c => c.User)
            .Include(c => c.Constituency)
            .Include(c => c.PoliticalParty).ThenInclude(p => p!.SymbolMediaFile)
            .Include(c => c.CandidateSymbol).ThenInclude(cs => cs!.CandidateSymbolMediaFile)
            .AsQueryable();

        if (constituencyId.HasValue)
        {
            query = query.Where(c => c.ConstituencyId == constituencyId.Value);
        }

        return await query.ToListAsync();
    }

    public async Task<Candidate?> GetByIdAsync(int id)
    {
        return await context.Candidates
            .Include(c => c.User)
            .Include(c => c.Constituency)
            .Include(c => c.PoliticalParty).ThenInclude(p => p!.SymbolMediaFile)
            .Include(c => c.CandidateSymbol).ThenInclude(cs => cs!.CandidateSymbolMediaFile)
            .FirstOrDefaultAsync(c => c.CandidateId == id);
    }

    public async Task AddAsync(Candidate candidate)
    {
        await context.Candidates.AddAsync(candidate);
    }

    public Task UpdateAsync(Candidate candidate)
    {
        context.Candidates.Update(candidate);
        return Task.CompletedTask;
    }
    
    public async Task DeleteAsync(Candidate candidate)
    {
        context.Candidates.Remove(candidate);
        await Task.CompletedTask;
    }
    
    public async Task<bool> ExistsByUserIdAsync(int userId, int? excludeCandidateId = null)
    {
        return await context.Candidates
            .AnyAsync(c => c.UserId == userId && c.CandidateId != excludeCandidateId);
    }

    public async Task<string?> GetConstituencyNameByUserIdAsync(int userId, int? excludeId = null)
    {
        return await context.Candidates
            .Where(c => c.UserId == userId && c.CandidateId != excludeId)
            .Select(c => c.Constituency.ConstituencyNameEn)
            .FirstOrDefaultAsync();
    }
    
    public async Task<bool> IsPartyTakenInConstituencyAsync(int constituencyId, int partyId, int? excludeCandidateId = null)
    {
        return await context.Candidates
            .AnyAsync(c => c.ConstituencyId == constituencyId 
                           && c.PoliticalPartyId == partyId 
                           && c.CandidateId != excludeCandidateId);
    }

    public async Task<bool> IsSymbolTakenInConstituencyAsync(int constituencyId, int symbolId, int? excludeCandidateId = null)
    {
        return await context.Candidates
            .AnyAsync(c => c.ConstituencyId == constituencyId 
                           && c.CandidateSymbolId == symbolId 
                           && c.CandidateId != excludeCandidateId);
    }
}