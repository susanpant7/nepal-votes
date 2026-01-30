using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.Authentication;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.VotingResults;

namespace NepalVotes.Api.VotingResults;

[ApiController]
[Route("api/votes")]
public class VoteController(IVoteService voteService) : ControllerBase
{
    [HttpGet("eligibility")]
    public async Task<IActionResult> GetEligibility()
    {
        var userId = HttpContext.User.GetUserId();
        var response = await voteService.CheckEligibilityAsync(userId);
        return response.ToActionResult();
    }
    
    [HttpGet("options/candidates")]
    public async Task<IActionResult> GetVoterCandidatesOptions()
    {
        var userId = HttpContext.User.GetUserId(); 
        var response = await voteService.GetVoterCandidateOptionsAsync(userId);
        return response.ToActionResult();
    }
    
    [HttpGet("options/parties")]
    public async Task<IActionResult> GetVoterPartiesOptions()
    {
        var response = await voteService.GetVoterPartiesOptionsAsync();
        return response.ToActionResult();
    }
}