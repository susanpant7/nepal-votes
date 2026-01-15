using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.PoliticalParties;

public interface IPoliticalPartyService
{
    Task<ApiResponse<IEnumerable<PoliticalPartyInfo>>> GetPartiesAsync();
}