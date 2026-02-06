using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace NepalVotes.Api.Test;

[ApiController]
[Route("api/tests")]
[AllowAnonymous]
public class UsersController() : ControllerBase
{
    [HttpGet]
    public string Test()
    {
        return ("Returning a simple test string at " + DateTimeOffset.UtcNow);
    }
    
}