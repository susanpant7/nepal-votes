using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.ElectoralGeographies;

namespace NepalVotes.Api.ElectoralGeographies;

[ApiController]
[Authorize(Roles = "ADMIN,SUPER_ADMIN")]
[Route("api/provinces")]
public class ProvincesController(IProvinceService provinceService) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetProvinces()
    {
        var response = await provinceService.GetAllAsync();
        return response.ToActionResult();
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetProvinceById(int id)
    {
        var response = await provinceService.GetByIdAsync(id);
        return response.ToActionResult();
    }

    [HttpPost]
    public async Task<IActionResult> AddProvince([FromBody] AddProvinceRequest request)
    {
        var response = await provinceService.AddAsync(request);
        return response.ToActionResult();
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateProvince(int id, [FromBody] UpdateProvinceRequest request)
    {
        var response = await provinceService.UpdateAsync(request with { ProvinceId = id });
        return response.ToActionResult();
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProvince(int id)
    {
        var response = await provinceService.DeleteAsync(id);
        return response.ToActionResult();
    }
}