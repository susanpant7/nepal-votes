using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.UserRegistrations;

namespace NepalVotes.Api.UserRegistrations;

[ApiController]
[Route("api/register")]
[AllowAnonymous]
public class UserRegistrationController(IUserRegistrationService service): ControllerBase
{
    private string GetRemoteIp() => 
        Request.HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
    
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Register([FromForm] RegisterUserApiRequest apiRequest)
    {
        var request = MapToRequest(apiRequest);
        var response = await service.RegisterAsync(request, GetRemoteIp());

        return response.ToActionResult();
    }

    [HttpPost("regenerate-otp")]
    public async Task<IActionResult> ReGenerateOtp([FromBody] GenerateOtpRequest request)
    {
        var response = await service.ReGenerateOtpForRegistration(request, GetRemoteIp());
        return response.ToActionResult();
    }

    [HttpPost("verify-otp")]
    public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequest request)
    {
        var response = await service.VerifyOtpAsync(request);
        return response.ToActionResult();
    }

    private static RegisterUserRequest MapToRequest(RegisterUserApiRequest apiRequest)
    {
        return new RegisterUserRequest
        {
            FirstName = apiRequest.FirstName,
            MiddleName = apiRequest.MiddleName,
            LastName = apiRequest.LastName,
            MobileNumber = apiRequest.MobileNumber,
            VotingPlaceId = apiRequest.VotingPlaceId,
            Documents = apiRequest.Documents.Select(apiDoc => 
            {
                using var ms = new MemoryStream();
                apiDoc.File.CopyTo(ms);
                return new DocumentUploadRequest
                {
                    DocumentType = apiDoc.DocumentType,
                    Content = ms.ToArray(),
                    FileName = apiDoc.File.FileName,
                    ContentType = apiDoc.File.ContentType,
                    FileLength = apiDoc.File.Length
                };
            }).ToList()
        };
    }
}