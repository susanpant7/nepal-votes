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
}