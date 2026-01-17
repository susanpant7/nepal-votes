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
    
    [HttpPost]
    public async Task<IActionResult> Add([FromForm] AddEditPoliticalPartyApiRequest request)
    {
        byte[]? fileContent = null;
        
        using var ms = new MemoryStream();
        await request.PartySymbolFile.CopyToAsync(ms);
        fileContent = ms.ToArray();

        var addRequest = new AddPoliticalPartyRequest(
            request.PoliticalPartyName,
            request.PartyLeaderId,
            fileContent,
            request.PartySymbolFile.FileName,
            request.PartySymbolFile.ContentType,
            request.PartySymbolFile.Length
        );

        var response = await partyService.AddPoliticalPartyAsync(addRequest);
        return response.ToActionResult();
    }
    
    [HttpPut]
    public async Task<IActionResult> Edit([FromForm] EditPoliticalPartyApiRequest request)
    {
        byte[]? fileContent = null;
        if (request.PartySymbolFile != null)
        {
            using var ms = new MemoryStream();
            await request.PartySymbolFile.CopyToAsync(ms);
            fileContent = ms.ToArray();
        }

        var editRequest = new EditPoliticalPartyRequest(
            request.PoliticalPartyId,
            request.PoliticalPartyName,
            request.PartyLeaderId,
            fileContent,
            request.PartySymbolFile?.FileName,
            request.PartySymbolFile?.ContentType,
            request.PartySymbolFile?.Length ?? 0
        );

        var response = await partyService.EditPoliticalPartyAsync(editRequest);
        return response.ToActionResult();
    }
    
}