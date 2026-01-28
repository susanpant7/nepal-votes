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
    public async Task<IActionResult> GetAll([FromQuery] int? constituencyId)
    {
        var response = await service.GetCandidatesByConstituencyIdAsync(constituencyId);
        return response.ToActionResult();
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var response = await service.GetCandidateByIdAsync(id);
        return response.ToActionResult();
    }

    [HttpPost]
    public async Task<IActionResult> Create(CandidateAddRequest candidateRequest) 
    {
        var response = await service.CreateCandidateAsync(candidateRequest);
        return response.ToActionResult();
    }
    
    [HttpPut]
    public async Task<IActionResult> Update(CandidateUpdateRequest candidateRequest) 
    {
        var response = await service.UpdateCandidateAsync(candidateRequest);
        return response.ToActionResult();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var response = await service.DeleteCandidateAsync(id);
        return response.ToActionResult();
    }
}