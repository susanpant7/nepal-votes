namespace NepalVotes.Domain.ElectoralGeographies;

public interface IDistrictRepository
{
    Task<IEnumerable<District>> GetByProvinceIdAsync(int provinceId);
    Task<IEnumerable<District>> GetAllAsync();
    Task<District?> GetByIdAsync(int id);
    Task AddAsync(District entity);
    Task UpdateAsync(District entity);
    Task<bool> ExistsByNameAsync(string name, int provinceId, int? excludeId = null);
    Task<bool> AnyByProvinceIdAsync(int provinceId);
    Task DeleteAsync(District district);
}