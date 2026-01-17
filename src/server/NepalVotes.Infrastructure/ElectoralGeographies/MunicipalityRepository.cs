using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.ElectoralGeographies;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.ElectoralGeographies;

public class MunicipalityRepository(ApplicationDbContext context) : IMunicipalityRepository
{
    public async Task<IEnumerable<Municipality>> GetByDistrictIdAsync(int districtId) =>
        await context.Municipalities.AsNoTracking().Where(m => m.DistrictId == districtId).ToListAsync();

    public async Task<Municipality?> GetByIdAsync(int id) =>
        await context.Municipalities.AsNoTracking().FirstOrDefaultAsync(m => m.MunicipalityId == id);

    public Task AddAsync(Municipality entity)
    {
        context.Municipalities.Add(entity);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(Municipality entity)
    {
        context.Municipalities.Update(entity);
        return Task.CompletedTask;
    }

    public async Task<bool> ExistsByNameAsync(string name, int districtId, int? excludeId = null) =>
        await context.Municipalities
            .AnyAsync(m => m.MunicipalityName == name && m.DistrictId == districtId && (!excludeId.HasValue || m.MunicipalityId != excludeId));
}
