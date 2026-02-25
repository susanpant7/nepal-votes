using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.Candidates;

public interface ICandidateService
{
    Task<ApiResponse<PagedResult<CandidateListItem>>> GetCandidatesAsync(int page = 1, int pageSize = 20, List<int>? constituencyIds = null, List<int>? politicalPartyIds = null, bool? isIndependent = null, string? searchTerm = null);
    Task<ApiResponse<CandidateDetail>> GetCandidateByIdAsync(int id);
    Task<ApiResponse<bool>> CreateCandidateAsync(CandidateAddRequest candidate);
    Task<ApiResponse<bool>> UpdateCandidateAsync(CandidateUpdateRequest candidateRequest);
    Task<ApiResponse<bool>> DeleteCandidateAsync(int id);
}