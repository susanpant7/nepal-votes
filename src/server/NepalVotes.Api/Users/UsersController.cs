using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.Authentication;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.Users;

namespace NepalVotes.Api.Users;

[ApiController]
[Route("api/users")]
public class UsersController(IUserService userService) : ControllerBase
{
    [HttpGet("profile")]
    public async Task<ActionResult> GetUserProfile()
    {
        var userId = User.UserId();
        var userProfile = await userService.GetUserProfileAsync(userId);
        return userProfile.ToActionResult();
    }
    
    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query))
            return BadRequest("Search query cannot be empty.");

        var usersResponse = await userService.SearchUsersAsync(query);
        return usersResponse.ToActionResult();
    }
}