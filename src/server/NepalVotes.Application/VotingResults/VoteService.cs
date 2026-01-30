using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Candidates;
using NepalVotes.Domain.PoliticalParties;
using NepalVotes.Domain.Users;
using NepalVotes.Domain.VotingResults;

namespace NepalVotes.Application.VotingResults;

public class VoteService(IVoteRepository repository, IUserRepository userRepository,
    ICandidateRepository candidateRepository, IPoliticalPartyRepository partyRepository) : IVoteService
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
    
    public async Task<ApiResponse<List<VoterCandidateSelectOptions>>> GetVoterCandidateOptionsAsync(int userId)
    {
        var constituencyId = await userRepository.GetUserConstituencyIdAsync(userId);
        
        if (constituencyId == null)
            return ApiResponse<List<VoterCandidateSelectOptions>>.ErrorResponse("User geographical data not found.");

        var candidates = (await candidateRepository.GetAllByConstituencyIdAsync(constituencyId.Value)).ToList();
        var voterCandidateOptions = candidates.Select(c => c.ToVoterCandidateOptions()).ToList();
        
        return ApiResponse<List<VoterCandidateSelectOptions>>.SuccessResponse(voterCandidateOptions);
    }
    
    public async Task<ApiResponse<List<VoterPartySelectOptions>>> GetVoterPartiesOptionsAsync()
    {
        var parties = (await partyRepository.GetAllPartiesAsync()).ToList();
        var partiesResponse = parties.Select(p => p.ToVoterPartyOptions()).ToList();

        return ApiResponse<List<VoterPartySelectOptions>>.SuccessResponse(partiesResponse);
    }
}