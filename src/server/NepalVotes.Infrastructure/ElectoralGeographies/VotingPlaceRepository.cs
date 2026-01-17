using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.ElectoralGeographies;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.ElectoralGeographies;

public class VotingPlaceRepository(ApplicationDbContext context) : IVotingPlaceRepository
{
    public async Task<IEnumerable<VotingPlace>> GetByWardIdAsync(int wardId) =>
        await context.VotingPlaces.AsNoTracking().Where(v => v.WardId == wardId).ToListAsync();

    public async Task<VotingPlace?> GetByIdAsync(int id) =>
        await context.VotingPlaces.AsNoTracking().FirstOrDefaultAsync(v => v.VotingPlaceId == id);

    public Task AddAsync(VotingPlace entity)
    {
        context.VotingPlaces.Add(entity);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(VotingPlace entity)
    {
        context.VotingPlaces.Update(entity);
        return Task.CompletedTask;
    }

    public async Task<bool> ExistsByAddressAsync(string address, int wardId, int? excludeId = null) =>
        await context.VotingPlaces
            .AnyAsync(v => v.VotingPlaceAddress == address && v.WardId == wardId && (!excludeId.HasValue || v.VotingPlaceId != excludeId));
}
