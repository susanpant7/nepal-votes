namespace NepalVotes.Domain.ElectoralGeographies;

public interface IDistrictRepository
{
    Task<IEnumerable<District>> GetByProvinceIdAsync(int provinceId);
    Task<District?> GetByIdAsync(int id);
    Task AddAsync(District entity);
    Task UpdateAsync(District entity);
    Task<bool> ExistsByNameAsync(string name, int provinceId, int? excludeId = null);
}