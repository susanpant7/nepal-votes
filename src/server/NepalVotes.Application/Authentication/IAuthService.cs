using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.Authentication;

public interface IAuthService
{
    Task<ApiResponse<bool>> GenerateOtpForLogin(OtpRequest request);
    Task<ApiResponse<bool>> VerifyOtpForLogin(OtpRequest request);
}
