using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.Extensions;
using NepalVotes.Application.Users;

namespace NepalVotes.Api.Users;

[Route("api/auth")]
[ApiController]
public class AuthController(IAuthService authService) : ControllerBase
{
    [AllowAnonymous]
    [HttpPost("send-otp")]
    public async Task<ActionResult> Login(OtpRequest request)
    {
        var result = await authService.GenerateOtp(request);
        return result.ToActionResult();
    }

}