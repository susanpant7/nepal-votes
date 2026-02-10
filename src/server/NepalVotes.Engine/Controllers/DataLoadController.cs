using Microsoft.AspNetCore.Mvc;

namespace NepalVotes.Engine.Controllers;

[ApiController]
[Route("api/data-load")]
public class DataLoadController : ControllerBase
{

    [HttpPost]
    public async Task<bool> Get()
    {
        return true;
    }
}