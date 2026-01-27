using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.Candidates;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.Candidates;

public class CandidateSymbolRepository(ApplicationDbContext context) : ICandidateSymbolRepository
{
    public async Task<(List<CandidateSymbol>, int)> GetPagedAsync(int skip, int take)
    {
        var query = context.CandidateSymbols
            .AsNoTracking()
            .Include(x => x.CandidateSymbolMediaFile)
            .OrderByDescending(x => x.CandidateSymbolId);

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip(skip)
            .Take(take)
            .ToListAsync();

        return (items, totalCount);
    }
    
    public async Task AddAsync(CandidateSymbol candidateSymbol)
    {
        await context.CandidateSymbols.AddAsync(candidateSymbol);
    }

    public async Task<bool> IsInUseAsync(int candidateSymbolId)
    {
        return await context.Candidates
            .AnyAsync(c => c.CandidateSymbolId == candidateSymbolId);
    }
    
    public async Task<CandidateSymbol?> GetByIdAsync(int id)
    {
        return await context.CandidateSymbols
            .Include(x => x.CandidateSymbolMediaFile)
            .FirstOrDefaultAsync(x => x.CandidateSymbolId == id);
    }
    
    public void Delete(CandidateSymbol candidateSymbol)
    {
        context.CandidateSymbols.Remove(candidateSymbol);
    }
}
