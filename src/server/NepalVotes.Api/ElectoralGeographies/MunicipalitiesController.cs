using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.ElectoralGeographies;

namespace NepalVotes.Api.ElectoralGeographies;

[ApiController]
[Authorize(Roles = "ADMIN,SUPER_ADMIN")]
[Route("api/municipalities")]
public class MunicipalitiesController(IMunicipalityService municipalityService) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetMunicipalitiesByDistrict([FromQuery] int districtId)
    {
        var response = await municipalityService.GetByDistrictIdAsync(districtId);
        return response.ToActionResult();
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetMunicipalityById(int id)
    {
        var response = await municipalityService.GetByIdAsync(id);
        return response.ToActionResult();
    }

    [HttpPost]
    [Authorize(Roles = "SUPER_ADMIN")]
    public async Task<IActionResult> AddMunicipality([FromBody] AddMunicipalityRequest request)
    {
        var response = await municipalityService.AddAsync(request);
        return response.ToActionResult();
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "SUPER_ADMIN")]
    public async Task<IActionResult> UpdateMunicipality(int id, [FromBody] UpdateMunicipalityRequest request)
    {
        var response = await municipalityService.UpdateAsync(request with { MunicipalityId = id });
        return response.ToActionResult();
    }
    
        
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "SUPER_ADMIN")]
    public async Task<IActionResult> DeleteMunicipality(int id)
    {
        var response = await municipalityService.DeleteAsync(id);
        return response.ToActionResult();
    }
}