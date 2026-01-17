using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.ElectoralGeographies;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.ElectoralGeographies;

public class WardRepository(ApplicationDbContext context) : IWardRepository
{
    public async Task<IEnumerable<Ward>> GetByMunicipalityIdAsync(int municipalityId) =>
        await context.Wards.AsNoTracking().Where(w => w.MunicipalityId == municipalityId).ToListAsync();

    public async Task<Ward?> GetByIdAsync(int id) =>
        await context.Wards.AsNoTracking().FirstOrDefaultAsync(w => w.WardId == id);

    public Task AddAsync(Ward entity)
    {
        context.Wards.Add(entity);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(Ward entity)
    {
        context.Wards.Update(entity);
        return Task.CompletedTask;
    }

    public async Task<bool> ExistsByNameAsync(string name, int municipalityId, int? excludeId = null) =>
        await context.Wards
            .AnyAsync(w => w.WardName == name && w.MunicipalityId == municipalityId && (!excludeId.HasValue || w.WardId != excludeId));
}
