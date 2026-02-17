using Microsoft.AspNetCore.Mvc;
using NepalVotes.Engine.Services;

namespace NepalVotes.Engine.Controllers;

[Route("api/constituency-data-load")]
[ApiController]
public class ConstituencyDataLoadController(IDataLoadService dataLoadService) : ControllerBase
{
    [HttpPost]
    public async Task<bool> UploadConstituencies()
    {
        return await dataLoadService.LoadConstituenciesAsync();
    }
}