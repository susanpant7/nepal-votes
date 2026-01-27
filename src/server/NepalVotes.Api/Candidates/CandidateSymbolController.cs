using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.Candidates;

namespace NepalVotes.Api.Candidates;

[ApiController]
[Authorize(Roles = "ADMIN,SUPER_ADMIN")]
[Route("api/candidate-symbols")]
public class CandidateSymbolController(ICandidateSymbolService candidateSymbolService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetCandidateSymbols([FromQuery] int pageNumber = 1, int pageSize = 10)
    {
        var response = await candidateSymbolService.GetCandidateSymbolsAsync(pageNumber, pageSize);
        return response.ToActionResult();
    }
    
    [HttpPost]
    public async Task<IActionResult> Add([FromForm] AddCandidateSymbolApiRequest request)
    {
        using var ms = new MemoryStream();
        await request.CandidateSymbolFile.CopyToAsync(ms);
        var fileContent = ms.ToArray();

        var addRequest = new AddCandidateSymbolRequest(
            fileContent,
            request.CandidateSymbolFile.FileName,
            request.CandidateSymbolFile.ContentType,
            request.CandidateSymbolFile.Length
        );

        var response = await candidateSymbolService.AddCandidateSymbolAsync(addRequest);
        return response.ToActionResult();
    }
    
    [HttpPut]
    public async Task<IActionResult> Update([FromForm] UpdateCandidateSymbolApiRequest request)
    {
        using var ms = new MemoryStream();
        await request.CandidateSymbolFile.CopyToAsync(ms);
        var fileContent = ms.ToArray();

        var updateRequest = new UpdateCandidateSymbolRequest(
            request.CandidateSymbolId,
            fileContent,
            request.CandidateSymbolFile.FileName,
            request.CandidateSymbolFile.ContentType,
            request.CandidateSymbolFile.Length
        );

        var response = await candidateSymbolService.UpdateCandidateSymbolAsync(updateRequest);
        return response.ToActionResult();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var response = await candidateSymbolService.DeleteCandidateSymbolAsync(id);
        return response.ToActionResult();
    }

}