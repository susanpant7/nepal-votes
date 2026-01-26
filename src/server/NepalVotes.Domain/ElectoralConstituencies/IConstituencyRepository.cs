namespace NepalVotes.Domain.ElectoralConstituencies;

public interface IConstituencyRepository
{
    Task<List<Constituency>> GetAllConstituenciesAsync();
    Task<Constituency?> GetByIdAsync(int id);
    Task<bool> ExistsByNameAsync(string name);
    Task<bool> ExistsByNameExceptIdAsync(string name, int excludeId);
    Task<Constituency?> GetAllGeographiesByIdAsync(int constituencyId);
    // Task<IEnumerable<Constituency>> GetAllAsync();
    Task AddAsync(Constituency constituency);
    Task UpdateAsync(Constituency constituency);
    Task DeleteAsync(Constituency constituency);
    Task<IEnumerable<Constituency>> GetConstituencyGeographiesByWardIdsAsync(IEnumerable<int> wardIds);

}