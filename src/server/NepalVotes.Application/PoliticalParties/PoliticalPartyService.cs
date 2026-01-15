using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.PoliticalParties;

namespace NepalVotes.Application.PoliticalParties;

public class PoliticalPartyService(IPoliticalPartyRepository repository) : IPoliticalPartyService
{
    public async Task<ApiResponse<IEnumerable<PoliticalPartyInfo>>> GetPartiesAsync()
    {
        var parties = await repository.GetAllPartiesAsync();
        
        var partiesInfo = parties.Select(party => party.ToPartyInfo()).ToList();

        return partiesInfo.Count == 0 ? 
            ApiResponse<IEnumerable<PoliticalPartyInfo>>.SuccessResponse(partiesInfo, "No political parties found.") 
            : ApiResponse<IEnumerable<PoliticalPartyInfo>>.SuccessResponse(partiesInfo);
    }
    
    public async Task<ApiResponse<PoliticalPartyInfo>> GetByIdAsync(int id)
    {
        var party = await repository.GetByIdAsync(id);

        return party == null ? 
            ApiResponse<PoliticalPartyInfo>.ErrorResponse("No political parties found.", 404) 
            : ApiResponse<PoliticalPartyInfo>.SuccessResponse(party.ToPartyInfo());
    }
}