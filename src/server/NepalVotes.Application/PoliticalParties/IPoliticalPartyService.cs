using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.PoliticalParties;

public interface IPoliticalPartyService
{
    Task<ApiResponse<IEnumerable<PoliticalPartyInfo>>> GetPartiesAsync();
    Task<ApiResponse<IEnumerable<PoliticalPartyDto>>> GetPartiesDropdownAsync();
    Task<ApiResponse<PoliticalPartyInfo>> GetByIdAsync(int id);
    Task<ApiResponse<bool>> AddPoliticalPartyAsync(AddPoliticalPartyRequest request);
    Task<ApiResponse<bool>> EditPoliticalPartyAsync(EditPoliticalPartyRequest request);
}