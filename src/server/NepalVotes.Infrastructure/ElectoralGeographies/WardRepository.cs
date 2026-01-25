using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.ElectoralGeographies;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.ElectoralGeographies;

public class WardRepository(ApplicationDbContext context) : IWardRepository
{
    public async Task<IEnumerable<Ward>> GetByMunicipalityIdAsync(int municipalityId) =>
        await context.Wards.AsNoTracking().Where(w => w.MunicipalityId == municipalityId).ToListAsync();

    public async Task<Ward?> GetByIdAsync(int id) =>
        await context.Wards.FirstOrDefaultAsync(w => w.WardId == id);

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
    
    public async Task<bool> AnyByMunicipalityIdAsync(int municipalityId)
    {
        return await context.Wards
            .AnyAsync(w => w.MunicipalityId == municipalityId);
    }

    public Task DeleteAsync(Ward ward)
    {
        context.Wards.Remove(ward);
        return Task.CompletedTask;
    }
    
    public async Task<IEnumerable<Ward>> GetByIdsAsync(IEnumerable<int> wardIds)
    {
        return await context.Wards
            .Where(w => wardIds.Contains(w.WardId))
            .ToListAsync();
    }
    
    // for the constituency page: when municipality is expanded
    public async Task<List<Ward>> GetWardsWithConstituencyByMunicipalityIdAsync(int municipalityId)
    {
        return await context.Wards
            .Include(w => w.Constituency) // includes the assigned constituency
            .Where(w => w.MunicipalityId == municipalityId)
            .OrderBy(w => w.WardNumber)
            .ToListAsync();
    }
    
    public async Task<Ward?> GetWithAllGeographyByIdAsync(int wardId)
    {
        return await context.Wards
            .Include(w => w.Municipality)
            .ThenInclude(m => m.District)
            .ThenInclude(d => d.Province)
            .Include(w => w.Constituency)
            .FirstOrDefaultAsync(w => w.WardId == wardId);
    }

}
