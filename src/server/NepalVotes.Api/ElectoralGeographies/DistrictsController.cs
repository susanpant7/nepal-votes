using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.ElectoralGeographies;

namespace NepalVotes.Api.ElectoralGeographies;

[ApiController]
[Authorize(Roles = "ADMIN,SUPER_ADMIN")]
[Route("api/districts")]
public class DistrictsController(IDistrictService districtService) : ControllerBase
{
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetDistrictById(int id)
    {
        var response = await districtService.GetByIdAsync(id);
        return response.ToActionResult();
    }

    [HttpPost]
    public async Task<IActionResult> AddDistrict([FromBody] AddDistrictRequest request)
    {
        var response = await districtService.AddAsync(request);
        return response.ToActionResult();
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateDistrict(int id, [FromBody] UpdateDistrictRequest request)
    {
        var response = await districtService.UpdateAsync(request with { DistrictId = id });
        return response.ToActionResult();
    }
    
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetDistrictsByProvinceId([FromQuery] int provinceId)
    {
        var response = await districtService.GetByProvinceAsync(provinceId);
        return response.ToActionResult();
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteDistrict(int id)
    {
        var response = await districtService.DeleteAsync(id);
        return response.ToActionResult();
    }
}