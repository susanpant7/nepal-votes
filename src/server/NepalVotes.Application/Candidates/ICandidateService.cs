using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Candidates;

namespace NepalVotes.Application.Candidates;

public interface ICandidateService
{
    Task<ApiResponse<IEnumerable<CandidateListItem>>> GetCandidatesAsync();
    Task<ApiResponse<CandidateDetail>> GetCandidateByIdAsync(int id);
    Task<ApiResponse<bool>> CreateCandidateAsync(Candidate candidate);
    Task<ApiResponse<bool>> DeleteCandidateAsync(int id);
}