using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.Authentication;

namespace NepalVotes.Api.Authentication;

[Route("api/auth")]
[ApiController]
public class AuthController(IAuthService authService) : ControllerBase
{
    
    [AllowAnonymous]
    [HttpPost("generate-otp")]
    public async Task<ActionResult> GenerateOtp(GenerateOtpRequest request)
    {
        var result = await authService.GenerateOtpForLogin(request);
        return result.ToActionResult();
    }
    
    [AllowAnonymous]
    [HttpPost("verify-otp")]
    public async Task<ActionResult> VerifyOtp(VerifyOtpRequest request)
    {
        var result = await authService.VerifyOtpForLogin(request);
        return result.ToActionResult();
    }

}