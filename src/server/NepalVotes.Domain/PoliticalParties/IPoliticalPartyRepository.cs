using NepalVotes.Domain.MediaFiles;

namespace NepalVotes.Domain.PoliticalParties;

public interface IPoliticalPartyRepository
{
    Task<IEnumerable<PoliticalParty>> GetAllPartiesAsync();
    Task<PoliticalParty?> GetByIdAsync(int id);
    public Task AddPoliticalPartyAsync(PoliticalParty party);
    public Task UpdatePoliticalPartyAsync(PoliticalParty party);
}