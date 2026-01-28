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
}