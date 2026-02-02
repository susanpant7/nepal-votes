using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.UserRegistrations;

namespace NepalVotes.Application.UserRegistrations;

public interface IUserRegistrationService
{
    public Task<ApiResponse<bool>> RegisterAsync(RegisterUserRequest request, string ipAddress);
    Task<ApiResponse<bool>> VerifyOtpAsync(VerifyOtpRequest request);
    Task<ApiResponse<bool>> ReGenerateOtpForRegistration(GenerateOtpRequest request, string ipAddress);
    Task<UserRegistration?> GetByMobileNumber(string mobileNumber);
}