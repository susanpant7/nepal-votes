using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.ElectoralGeographies;

public interface IVotingPlaceService
{
    Task<ApiResponse<IEnumerable<VotingPlaceInfo>>> GetByWardIdAsync(int wardId);
    Task<ApiResponse<VotingPlaceInfo?>> GetByIdAsync(int id);
    Task<ApiResponse<bool>> AddAsync(AddVotingPlaceRequest request);
    Task<ApiResponse<bool>> UpdateAsync(UpdateVotingPlaceRequest request);
}