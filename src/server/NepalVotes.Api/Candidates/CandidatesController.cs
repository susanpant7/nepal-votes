using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.Candidates;
using NepalVotes.Domain.Candidates;

namespace NepalVotes.Api.Candidates;

[ApiController]
[Authorize(Roles = "ADMIN,SUPER_ADMIN")]
[Route("api/candidates")]
public class CandidatesController(ICandidateService service) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var response = await service.GetCandidatesAsync();
        return response.ToActionResult();
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var response = await service.GetCandidateByIdAsync(id);
        return response.ToActionResult();
    }

    [HttpPost]
    public async Task<IActionResult> Create(Candidate candidate) 
    {
        var response = await service.CreateCandidateAsync(candidate);
        return response.ToActionResult();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var response = await service.DeleteCandidateAsync(id);
        return response.ToActionResult();
    }
}