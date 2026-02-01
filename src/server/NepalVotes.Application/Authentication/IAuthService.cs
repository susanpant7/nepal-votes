using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.Authentication;

public interface IAuthService
{
    Task<ApiResponse<bool>> GenerateOtpForLogin(GenerateOtpRequest request, string ipAddress);
    Task<ApiResponse<TokenResponse>> VerifyOtpForLogin(VerifyOtpRequest request);
    Task<ApiResponse<TokenResponse>> RefreshTokensAsync(string refreshToken);
}
