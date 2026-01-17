namespace NepalVotes.Domain.ElectoralGeographies;

public interface IMunicipalityRepository
{
    Task<IEnumerable<Municipality>> GetByDistrictIdAsync(int districtId);
    Task<Municipality?> GetByIdAsync(int id);
    Task AddAsync(Municipality entity);
    Task UpdateAsync(Municipality entity);
    Task<bool> ExistsByNameAsync(string name, int districtId, int? excludeId = null);
}