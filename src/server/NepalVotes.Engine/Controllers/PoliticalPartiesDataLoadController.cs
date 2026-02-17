using Microsoft.AspNetCore.Mvc;
using NepalVotes.Engine.Services;

namespace NepalVotes.Engine.Controllers;

[ApiController]
[Route("api/political-party-data-load")]
public class PoliticalPartiesDataLoadController(IDataLoadService dataLoadService) : ControllerBase
{
    [HttpPost]
    public async Task<bool> UploadPoliticalParties()
    {
        return await dataLoadService.LoadPoliticalPartiesAsync();
    }
}