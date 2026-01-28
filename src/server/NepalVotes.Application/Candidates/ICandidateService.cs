using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.Candidates;

public interface ICandidateService
{
    Task<ApiResponse<IEnumerable<CandidateListItem>>> GetCandidatesByConstituencyIdAsync(int? constituencyId);
    Task<ApiResponse<CandidateDetail>> GetCandidateByIdAsync(int id);
    Task<ApiResponse<bool>> CreateCandidateAsync(CandidateAddRequest candidate);
    Task<ApiResponse<bool>> DeleteCandidateAsync(int id);
}