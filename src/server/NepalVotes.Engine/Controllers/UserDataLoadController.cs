using Microsoft.AspNetCore.Mvc;
using NepalVotes.Engine.Services;

namespace NepalVotes.Engine.Controllers;

[ApiController]
[Route("api/user-data-load")]
public class UserDataLoadController(IDataLoadService dataLoadService) : ControllerBase
{
    [HttpPost]
    public async Task<bool> UploadPoliticalParties()
    {
        return await dataLoadService.LoadUsers();
    }
}