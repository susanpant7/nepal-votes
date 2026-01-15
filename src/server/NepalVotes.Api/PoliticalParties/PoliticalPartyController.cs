using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.PoliticalParties;

namespace NepalVotes.Api.PoliticalParties;

[ApiController]
[Authorize(Roles = "ADMIN,SUPER_ADMIN")]
[Route("api/political-parties")]
public class PoliticalPartyController(IPoliticalPartyService partyService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetPoliticalParties()
    {
        var response = await partyService.GetPartiesAsync();

        return response.ToActionResult();
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var partyResponse = await partyService.GetByIdAsync(id);

        return partyResponse.ToActionResult();
    }
    
}