using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.ElectoralGeographies;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.ElectoralGeographies;

public class ProvinceRepository(ApplicationDbContext context) : IProvinceRepository
{
    public async Task<IEnumerable<Province>> GetAllAsync() =>
        await context.Provinces.AsNoTracking().ToListAsync();

    public async Task<Province?> GetByIdAsync(int id) =>
        await context.Provinces.AsNoTracking().FirstOrDefaultAsync(p => p.ProvinceId == id);

    public Task AddAsync(Province entity)
    {
        context.Provinces.Add(entity);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(Province entity)
    {
        context.Provinces.Update(entity);
        return Task.CompletedTask;
    }

    public async Task<bool> ExistsByNameAsync(string name, int? excludeId = null) =>
        await context.Provinces
            .AnyAsync(p => p.ProvinceName == name && (!excludeId.HasValue || p.ProvinceId != excludeId));
}