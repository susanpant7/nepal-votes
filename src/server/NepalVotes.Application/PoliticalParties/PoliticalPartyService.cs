using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.PoliticalParties;

namespace NepalVotes.Application.PoliticalParties;

public class PoliticalPartyService(IPoliticalPartyRepository repository) : IPoliticalPartyService
{
    public async Task<ApiResponse<IEnumerable<PoliticalPartyInfo>>> GetPartiesAsync()
    {
        var parties = await repository.GetAllPartiesAsync();
        
        var partiesInfo = parties.Select(party => party.ToUserProfile()).ToList();

        return partiesInfo.Count == 0 ? 
            ApiResponse<IEnumerable<PoliticalPartyInfo>>.SuccessResponse(partiesInfo, "No political parties found.") 
            : ApiResponse<IEnumerable<PoliticalPartyInfo>>.SuccessResponse(partiesInfo);
    }
}