using NepalVotes.Application.Authentication;
using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.UserRegistrations;

public interface IUserRegistrationService
{
    public Task<ApiResponse<RegisterUserResponse>> RegisterAsync(RegisterUserRequest request, string ipAddress);
    Task<ApiResponse<bool>> VerifyOtpAsync(VerifyOtpRequest request);
    Task<ApiResponse<bool>> ReGenerateOtpForRegistration(GenerateOtpRequest request, string ipAddress);
}