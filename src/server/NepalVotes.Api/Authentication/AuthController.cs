using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.Authentication;
using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Api.Authentication;

[Route("api/auth")]
[ApiController]
public class AuthController(IAuthService authService) : ControllerBase
{
    private const  string RefreshTokenCookieName = "RefreshToken";
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
        var response = await authService.VerifyOtpForLogin(request);
        if (!response.Success || string.IsNullOrWhiteSpace(response?.Data?.RefreshToken))
        {
            var result = ApiResponse<TokenResponse>.ErrorResponse("No refresh token found for the user",401);
            return result.ToActionResult();
        }
        SetRefreshTokenInCookie(response.Data);
        
        return response.ToActionResult();
    }
    
    [AllowAnonymous]
    [HttpGet("refresh")]
    public async Task<ActionResult> RefreshToken()
    {
        // Get refresh token from HttpOnly cookie
        if (!Request.Cookies.TryGetValue(RefreshTokenCookieName, out var refreshToken))
        {
            var result = ApiResponse<TokenResponse>.ErrorResponse("No refresh token",401);
            return result.ToActionResult();
        }

        var response = await authService.RefreshTokensAsync(refreshToken);
        if (!response.Success || string.IsNullOrWhiteSpace(response?.Data?.RefreshToken))
        {
            var result = ApiResponse<TokenResponse>.ErrorResponse("No refresh token found for the user",401);
            return result.ToActionResult();
        }

        SetRefreshTokenInCookie(response.Data);
        
        return response.ToActionResult();
    }
    
    private void SetRefreshTokenInCookie(TokenResponse tokenResponse)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTimeOffset.UtcNow.AddDays(tokenResponse.RefreshTokenExpiryInDays)
        };

        Response.Cookies.Append(RefreshTokenCookieName, tokenResponse.RefreshToken, cookieOptions);
        tokenResponse.RefreshToken = string.Empty;
    }
    
    [AllowAnonymous]
    [HttpGet("logout")]
    public ActionResult Logout()
    {
        Response.Cookies.Delete(RefreshTokenCookieName);
        return ApiResponse<bool>.SuccessResponse(true,"User logged out").ToActionResult();
    }

}