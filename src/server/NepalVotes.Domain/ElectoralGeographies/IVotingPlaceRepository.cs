namespace NepalVotes.Domain.ElectoralGeographies;

public interface IVotingPlaceRepository
{
    Task<IEnumerable<VotingPlace>> GetByWardIdAsync(int wardId);
    Task<VotingPlace?> GetByIdAsync(int id);
    Task AddAsync(VotingPlace entity);
    Task UpdateAsync(VotingPlace entity);
    Task<bool> ExistsByAddressAsync(string address, int wardId, int? excludeId = null);
}