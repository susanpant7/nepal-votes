namespace NepalVotes.Domain.ElectoralGeographies;

public interface IWardRepository
{
    Task<IEnumerable<Ward>> GetByMunicipalityIdAsync(int municipalityId);
    Task<Ward?> GetByIdAsync(int id);
    Task AddAsync(Ward entity);
    Task UpdateAsync(Ward entity);
    Task<bool> ExistsByNameAsync(string name, int municipalityId, int? excludeId = null);
    Task<bool> AnyByMunicipalityIdAsync(int municipalityId);
    Task DeleteAsync(Ward ward);
}