using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.VotingResults;

namespace NepalVotes.Application.VotingResults;

public class VoteService(IVoteRepository repository) : IVoteService
{
    public async Task<ApiResponse<VoteEligibilityResponse>> CheckEligibilityAsync(int userId)
    {
        var alreadyVoted = await repository.HasUserVotedAsync(userId);
        
        var eligibility = new VoteEligibilityResponse
        {
            CanVote = !alreadyVoted,
            Message = alreadyVoted ? "You have already cast your vote." : "You are eligible to vote.",
            CheckedAt = DateTime.UtcNow
        };

        return ApiResponse<VoteEligibilityResponse>.SuccessResponse(eligibility);
    }
}