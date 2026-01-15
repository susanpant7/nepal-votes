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
}