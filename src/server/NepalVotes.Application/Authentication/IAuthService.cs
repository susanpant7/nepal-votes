using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.Authentication;

public interface IAuthService
{
    Task<ApiResponse<bool>> GenerateOtpForLogin(GenerateOtpRequest request);
    Task<ApiResponse<TokenResponse>> VerifyOtpForLogin(VerifyOtpRequest request);
}
