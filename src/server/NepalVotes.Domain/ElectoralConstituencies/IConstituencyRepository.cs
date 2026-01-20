namespace NepalVotes.Domain.ElectoralConstituencies;

public interface IConstituencyRepository
{
    Task<Constituency?> GetByIdAsync(int id);
    Task<IEnumerable<Constituency>> GetAllAsync();
    Task AddAsync(Constituency constituency);
    Task UpdateAsync(Constituency constituency);
    Task DeleteAsync(Constituency constituency);
    Task<IEnumerable<Constituency>> GetConstituencyGeographiesByWardIdsAsync(IEnumerable<int> wardIds);

}