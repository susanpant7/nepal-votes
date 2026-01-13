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
    [HttpPost("login")]
    public async Task<ActionResult> VerifyOtpAndLogin(VerifyOtpRequest request)
    {
        var result = await authService.VerifyOtpForLogin(request);
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true, // Client-side JavaScript cannot access the cookies
            //Secure = true,   // Only sent over HTTPS
            SameSite = SameSiteMode.Strict
        };

        Response.Cookies.Append("RefreshToken",result.Data.RefreshToken, new CookieOptions(cookieOptions)
        {
            Expires = DateTimeOffset.UtcNow.AddMinutes(result.Data.RefreshTokenExpiryInDays)
        });
        result.Data.RefreshToken = string.Empty;
        return result.ToActionResult();
    }

}