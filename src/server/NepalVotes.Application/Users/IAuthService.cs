using NepalVotes.Application.Responses;

namespace NepalVotes.Application.Users;

public interface IAuthService
{
    Task<ApiResponse<bool>> GenerateOtp(OtpRequest request);
}
