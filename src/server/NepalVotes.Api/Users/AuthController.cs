using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.Users;

namespace NepalVotes.Api.Users;

[Route("api/auth")]
[ApiController]
public class AuthController(IAuthService authService) : ControllerBase
{
    
    [AllowAnonymous]
    [HttpPost("send-otp")]
    public async Task<ActionResult> SendOtp(OtpRequest request)
    {
        var result = await authService.GenerateOtpForLogin(request);
        return result.ToActionResult();
    }
    
    [AllowAnonymous]
    [HttpPost("verify-otp")]
    public async Task<ActionResult> VerifyOtp(OtpRequest request)
    {
        var result = await authService.VerifyOtpForLogin(request);
        return result.ToActionResult();
    }

}