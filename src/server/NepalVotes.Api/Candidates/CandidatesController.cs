using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.Candidates;

namespace NepalVotes.Api.Candidates;

[ApiController]
[Authorize(Roles = "ADMIN,SUPER_ADMIN")]
[Route("api/candidates")]
public class CandidatesController(ICandidateService service) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetByConstituency([FromQuery] int? constituencyId = null)
    {
        var ids = constituencyId.HasValue ? new List<int> { constituencyId.Value } : null;
        var response = await service.GetCandidatesAsync(1, int.MaxValue, ids);
        if (!response.Success) return response.ToActionResult();
        var items = response.Data?.Items ?? [];
        return Ok(new { success = true, data = items });
    }

    [HttpPost("search")]
    [AllowAnonymous]
    public async Task<IActionResult> Search([FromBody] GetCandidatesRequest request)
    {
        var response = await service.GetCandidatesAsync(request.Page, request.PageSize, request.ConstituencyIds, request.PoliticalPartyIds, request.IsIndependent);
        return response.ToActionResult();
    }
    
    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> Get(int id)
    {
        var response = await service.GetCandidateByIdAsync(id);
        return response.ToActionResult();
    }

    [HttpPost]
    [Authorize(Roles = "SUPER_ADMIN")]
    public async Task<IActionResult> Create(CandidateAddRequest candidateRequest) 
    {
        var response = await service.CreateCandidateAsync(candidateRequest);
        return response.ToActionResult();
    }
    
    [HttpPut]
    [Authorize(Roles = "SUPER_ADMIN")]
    public async Task<IActionResult> Update(CandidateUpdateRequest candidateRequest) 
    {
        var response = await service.UpdateCandidateAsync(candidateRequest);
        return response.ToActionResult();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "SUPER_ADMIN")]
    public async Task<IActionResult> Delete(int id)
    {
        var response = await service.DeleteCandidateAsync(id);
        return response.ToActionResult();
    }
}