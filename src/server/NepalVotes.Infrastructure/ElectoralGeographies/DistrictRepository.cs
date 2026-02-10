using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.ElectoralGeographies;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.ElectoralGeographies;

public class DistrictRepository(ApplicationDbContext context) : IDistrictRepository
{
    public async Task<IEnumerable<District>> GetByProvinceIdAsync(int provinceId) =>
        await context.Districts.AsNoTracking().Where(d => d.ProvinceId == provinceId).ToListAsync();
    
    public async Task<IEnumerable<District>> GetAllAsync() =>
        await context.Districts.AsNoTracking().ToListAsync();

    public async Task<District?> GetByIdAsync(int id) =>
        await context.Districts.FirstOrDefaultAsync(d => d.DistrictId == id);

    public Task AddAsync(District entity)
    {
        context.Districts.Add(entity);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(District entity)
    {
        context.Districts.Update(entity);
        return Task.CompletedTask;
    }

    public async Task<bool> ExistsByNameAsync(string name, int provinceId, int? excludeId = null) =>
        await context.Districts
            .AnyAsync(d => d.DistrictNameEn == name && d.ProvinceId == provinceId && (!excludeId.HasValue || d.DistrictId != excludeId));
    
    public async Task<bool> AnyByProvinceIdAsync(int provinceId)
    {
        return await context.Districts
            .AnyAsync(d => d.ProvinceId == provinceId);
    }

    public Task DeleteAsync(District district)
    {
        context.Districts.Remove(district);
        return Task.CompletedTask;
    }
}
