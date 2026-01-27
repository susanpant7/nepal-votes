using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.Candidates;

public interface ICandidateSymbolService
{
    Task<ApiResponse<PagedResult<CandidateSymbolInfo>>> GetCandidateSymbolsAsync(int pageNumber, int pageSize);
    Task<ApiResponse<bool>> AddCandidateSymbolAsync(AddCandidateSymbolRequest request);
    Task<ApiResponse<bool>> UpdateCandidateSymbolAsync(UpdateCandidateSymbolRequest request);
    Task<ApiResponse<bool>> DeleteCandidateSymbolAsync(int candidateSymbolId);
}