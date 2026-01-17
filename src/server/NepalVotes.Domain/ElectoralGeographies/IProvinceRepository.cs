namespace NepalVotes.Domain.ElectoralGeographies;

public interface IProvinceRepository
{
    Task<IEnumerable<Province>> GetAllAsync();
    Task<Province?> GetByIdAsync(int id);
    Task AddAsync(Province entity);
    Task UpdateAsync(Province entity);
    Task<bool> ExistsByNameAsync(string name, int? excludeId = null);
}