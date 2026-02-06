using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Candidates;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.PoliticalParties;
using NepalVotes.Domain.Users;
using NepalVotes.Domain.VotingResults;

namespace NepalVotes.Application.VotingResults;

public class VoteService(IVoteRepository repository, IUserRepository userRepository,
    ICandidateRepository candidateRepository, IPoliticalPartyRepository partyRepository, IUnitOfWork unitOfWork) : IVoteService
{
    public async Task<ApiResponse<VoteEligibilityResponse>> CheckEligibilityAsync(int userId)
    {
        var alreadyVoted = await repository.HasUserVotedAsync(userId);
        VoteEligibilityResponse eligibility;
        if (alreadyVoted)
        {
            eligibility = new VoteEligibilityResponse
            {
                CanVote = false,
                Message = "You have already cast your vote.",
                CheckedAt = DateTime.UtcNow
            };
            return ApiResponse<VoteEligibilityResponse>.SuccessResponse(eligibility);
        }
        var constituencyName = await userRepository.GetUserConstituencyNameAsync(userId); 
        if (constituencyName == null)
        {
            eligibility = new VoteEligibilityResponse
            {
                CanVote = false,
                Message = "You do not belong to any constituency to vote. Contact administrator for more information.",
                CheckedAt = DateTime.UtcNow
            };
            return ApiResponse<VoteEligibilityResponse>.SuccessResponse(eligibility);
        }
        eligibility = new VoteEligibilityResponse
        {
            CanVote = true,
            Message = "You are eligible to vote.",
            CheckedAt = DateTime.UtcNow,
            ConstituencyName = constituencyName
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
    
    public async Task<ApiResponse<bool>> SubmitVoteAsync(int userId, SubmitVoteRequest request)
    {
        if (await repository.HasUserVotedAsync(userId))
        {
            return ApiResponse<bool>.ErrorResponse("You have already cast your vote.");
        }
        var user = await userRepository.GetUserWithVotingPlaceByUserIdAsync(userId);
    
        if (user?.VotingPlace?.Ward?.ConstituencyId == null)
        {
            return ApiResponse<bool>.ErrorResponse("User registration data is incomplete.");
        }
        
        var vote = new Vote
        {
            CandidateId = request.CandidateId == -1 ? null : request.CandidateId,
            PoliticalPartyId = request.PartyId == -1 ? null : request.PartyId,
            VotedFromLocation = request.VotedFromLocation,
            ConstituencyId = user.VotingPlace.Ward.ConstituencyId.Value
        };

        try 
        {
            await repository.AddAsync(vote);
            await unitOfWork.SaveChangesAsync();
            return ApiResponse<bool>.SuccessResponse(true, "Your vote has been submitted.");
        }
        catch (Exception ex)
        {
            return ApiResponse<bool>.ErrorResponse("An error occurred while saving your vote.");
        }
    }
}