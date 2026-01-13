using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.Authentication;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.Users;

namespace NepalVotes.Api.Users;

[ApiController]
[Route("api/user-profile")]
public class UserProfileController(IUserService userService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetUserProfile()
    {
        var userId = User.UserId();
        var userProfile = await userService.GetUserProfileAsync(userId);
        return userProfile.ToActionResult();
    }
}