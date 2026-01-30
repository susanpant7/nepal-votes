using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.VotingResults;

public interface IVoteService
{
    Task<ApiResponse<VoteEligibilityResponse>> CheckEligibilityAsync(int userId);
    Task<ApiResponse<List<VoterCandidateSelectOptions>>> GetVoterCandidateOptionsAsync(int userId);
    Task<ApiResponse<List<VoterPartySelectOptions>>> GetVoterPartiesOptionsAsync();
}