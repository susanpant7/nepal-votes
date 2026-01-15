namespace NepalVotes.Domain.PoliticalParties;

public interface IPoliticalPartyRepository
{
    Task<IEnumerable<PoliticalParty>> GetAllPartiesAsync();
}