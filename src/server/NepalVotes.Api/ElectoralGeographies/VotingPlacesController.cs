using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.ElectoralGeographies;

namespace NepalVotes.Api.ElectoralGeographies;

[ApiController]
[Authorize(Roles = "ADMIN,SUPER_ADMIN")]
[Route("api/voting-places")]
public class VotingPlacesController(IVotingPlaceService votingPlaceService) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetVotingPlacesByWard([FromQuery] int wardId)
    {
        var response = await votingPlaceService.GetByWardIdAsync(wardId);
        return response.ToActionResult();
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetVotingPlaceById(int id)
    {
        var response = await votingPlaceService.GetByIdAsync(id);
        return response.ToActionResult();
    }

    [HttpPost]
    [Authorize(Roles = "SUPER_ADMIN")]
    public async Task<IActionResult> AddVotingPlace([FromBody] AddVotingPlaceRequest request)
    {
        var response = await votingPlaceService.AddAsync(request);
        return response.ToActionResult();
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "SUPER_ADMIN")]
    public async Task<IActionResult> UpdateVotingPlace(int id, [FromBody] UpdateVotingPlaceRequest request)
    {
        var response = await votingPlaceService.UpdateAsync(request with { VotingPlaceId = id });
        return response.ToActionResult();
    }
    
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "SUPER_ADMIN")]
    public async Task<IActionResult> DeleteVotingPlace(int id)
    {
        var response = await votingPlaceService.DeleteAsync(id);
        return response.ToActionResult();
    }
}