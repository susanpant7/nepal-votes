using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.ElectoralConstituencies;

namespace NepalVotes.Api.ElectoralConstituencies;

[ApiController]
[Authorize(Roles = "ADMIN,SUPER_ADMIN")]
[Route("api/constituencies")]
public class ConstituencyController(IConstituencyService service) : ControllerBase
{
    // [HttpGet]
    // public async Task<IActionResult> GetAll()
    // {
    //     var response = await service.GetAllAsync();
    //     return response.ToActionResult();
    // }
    
    [HttpGet("dropdown")]
    [AllowAnonymous]
    public async Task<IActionResult> GetDropdown()
    {
        var response = await service.GetDropdownAsync();
        return response.ToActionResult();
    }

    [HttpGet("all-with-location")]
    [AllowAnonymous]
    public async Task<IActionResult> GetAllWithLocation()
    {
        var response = await service.GetAllWithLocationAsync();
        return response.ToActionResult();
    }
    
    [HttpGet("unassigned-wards")]
    public async Task<IActionResult> GetUnassignedWards()
    {
        var response = await service.GetUnassignedWardsAsync();
        return response.ToActionResult();
    }
    
    // for the constituency list table
    [HttpGet ("list-item")]
    public async Task<IActionResult> GetListItemsByDistrict([FromQuery] int districtId)
    {
        var response = await service.GetByAndDistrictAsync(districtId);
        return response.ToActionResult();
    }
    
    [HttpGet ("{constituencyId}")]
    public async Task<IActionResult> GetDetailsByConstituencyId(int constituencyId)
    {
        var response = await service.GetConstituencyDetailAsync(constituencyId);
        return response.ToActionResult();
    }
    
    [HttpGet ("ward-assignments")]
    public async Task<IActionResult> GetMunicipalityWardsWithConstituency([FromQuery] int municipalityId)
    {
        var response = await service.GetWardsWithConstituencyByMunicipalityAsync(municipalityId);
        return response.ToActionResult();
    }
    
    [HttpPut("reassign-ward")]
    [Authorize(Roles = "SUPER_ADMIN")]
    public async Task<IActionResult> ReassignWard([FromBody] ReassignWardRequest request)
    {
        var response = await service.ReassignWardAsync(request.WardId, request.ConstituencyId);
        return response.ToActionResult();
    }

    [HttpPost]
    [Authorize(Roles = "SUPER_ADMIN")]
    public async Task<IActionResult> Add([FromBody] AddConstituencyRequest request)
    {
        var response = await service.AddAsync(request);
        return response.ToActionResult();    
    }

    [HttpPut]
    [Authorize(Roles = "SUPER_ADMIN")]
    public async Task<IActionResult> Update([FromBody] UpdateConstituencyRequest request)
    {
        var response = await service.UpdateAsync(request);
        return response.ToActionResult();    
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "SUPER_ADMIN")]
    public async Task<IActionResult> Delete(int id)
    {
        var response = await service.DeleteAsync(id);
        return response.ToActionResult();
    }
}