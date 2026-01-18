using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.ElectoralGeographies;
using NepalVotes.Domain.Exceptions;

namespace NepalVotes.Api.ElectoralGeographies;

[ApiController]
[Authorize(Roles = "ADMIN,SUPER_ADMIN")]
[Route("api/wards")]
public class WardsController(IWardService wardService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetWardsByMunicipalityId([FromQuery] int municipalityId)
    {
        var response = await wardService.GetByMunicipalityIdAsync(municipalityId);
        return response.ToActionResult();
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetWardById(int id)
    {
        var response = await wardService.GetByIdAsync(id);
        return response.ToActionResult();
    }

    [HttpPost]
    public async Task<IActionResult> AddWard([FromBody] AddWardRequest request)
    {
        var response = await wardService.AddAsync(request);
        return response.ToActionResult();
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateWard(int id, [FromBody] UpdateWardRequest request)
    {
        var response = await wardService.UpdateAsync(request with { WardId = id });
        return response.ToActionResult();
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteWard(int id)
    {
        var response = await wardService.DeleteAsync(id);
        return response.ToActionResult();
    }
}