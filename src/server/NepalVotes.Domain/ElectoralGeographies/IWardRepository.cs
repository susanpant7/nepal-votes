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
    Task<IEnumerable<Ward>> GetByIdsAsync(IEnumerable<int> wardIds);
    // for the constituency page: when municipality is expanded
    Task<List<Ward>> GetWardsWithConstituencyByMunicipalityIdAsync(int municipalityId);
    Task<Ward?> GetWithAllGeographyByIdAsync(int wardId);

}