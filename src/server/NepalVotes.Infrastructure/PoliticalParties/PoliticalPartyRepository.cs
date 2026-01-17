using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.PoliticalParties;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.PoliticalParties;

public class PoliticalPartyRepository(ApplicationDbContext context) : IPoliticalPartyRepository
{
    public async Task<IEnumerable<PoliticalParty>> GetAllPartiesAsync()
    {
        return await context.PoliticalParties
            .Include(p => p.PartyLeader)
            .Include(p => p.SymbolMediaFile)
            .AsNoTracking()
            .ToListAsync();
    }
    
    public async Task<PoliticalParty?> GetByIdAsync(int id)
    {
        return await context.PoliticalParties
            .Include(p => p.PartyLeader)
            .Include(p => p.SymbolMediaFile)
            .FirstOrDefaultAsync(p => p.PoliticalPartyId == id);
    }
    
    public async Task AddPoliticalPartyAsync(PoliticalParty party)
    {
        await context.PoliticalParties.AddAsync(party);
    }

    public Task UpdatePoliticalPartyAsync(PoliticalParty party)
    {
        context.PoliticalParties.Update(party);
        return Task.CompletedTask;
    }
}