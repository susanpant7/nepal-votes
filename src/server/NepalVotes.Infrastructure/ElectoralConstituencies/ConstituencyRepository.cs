using Microsoft.EntityFrameworkCore;
using NepalVotes.Application.ElectoralConstituencies;
using NepalVotes.Domain.ElectoralConstituencies;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.ElectoralConstituencies;

public class ConstituencyRepository(ApplicationDbContext context) : IConstituencyRepository
{
    public async Task AddAsync(Constituency constituency)
    {
        await context.Constituencies.AddAsync(constituency);
    }

    public async Task DeleteAsync(Constituency constituency)
    {
        context.Constituencies.Remove(constituency);
    }

    // public async Task<IEnumerable<Constituency>> GetAllAsync()
    // {
    //     return await context.Constituencies
    //         .Include(c => c.Wards)
    //         .ThenInclude(w => w.Municipality)
    //         .ThenInclude(m => m.District)
    //         .ThenInclude(d => d.Province)
    //         .ToListAsync();
    // }

    public async Task<List<Constituency>> GetAllConstituenciesAsync()
    {
        return await context.Constituencies
            .OrderBy(c => c.ConstituencyNameEn)
            .ToListAsync();
    }

    public async Task<Constituency?> GetByIdAsync(int id)
    {
        return await context.Constituencies
            .Include(c => c.Wards)
            .FirstOrDefaultAsync(c => c.ConstituencyId == id);
    }
    
    public async Task<bool> ExistsByNameAsync(string name)
    {
        var normalizedName = name.ToUpper().Trim();

        return await context.Constituencies.AnyAsync(c =>
            c.ConstituencyNameEn.ToUpper().Trim() == normalizedName);
    }

    public async Task<bool> ExistsByNameExceptIdAsync(string name, int excludeId)
    {
        var normalizedName = name.ToUpper().Trim();

        return await context.Constituencies.AnyAsync(c =>
            c.ConstituencyId != excludeId &&
            c.ConstituencyNameEn.ToUpper().Trim() == normalizedName);
    }
    
    public async Task<Constituency?> GetAllGeographiesByIdAsync(int constituencyId)
    {
        return await context.Constituencies
            .Include(c => c.Wards)
            .ThenInclude(w => w.Municipality)
            .ThenInclude(m => m.District)
            .ThenInclude(d => d.Province)
            .FirstOrDefaultAsync(c => c.ConstituencyId == constituencyId);
    }

    public async Task UpdateAsync(Constituency constituency)
    {
        context.Constituencies.Update(constituency);
    }
    
    public async Task<IEnumerable<Constituency>> GetConstituencyGeographiesByWardIdsAsync(IEnumerable<int> wardIds)
    {
        return await context.Constituencies
            .Include(c => c.Wards)
            .ThenInclude(w => w.Municipality)
            .ThenInclude(m => m.District)
            .ThenInclude(d => d.Province)
            .Where(c => c.Wards.Any(w => wardIds.Contains(w.WardId)))
            .ToListAsync();
    }
    
}
