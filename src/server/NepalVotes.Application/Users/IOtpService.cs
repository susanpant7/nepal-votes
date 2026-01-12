using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Users;

public interface IOtpService
{
    Task<ApiResponse<bool>> GenerateAndSaveOtp(string mobile, UserOtpType type, int userId);
    Task<ApiResponse<bool>> VerifyOtp(string mobile, string providedOtp, UserOtpType type, int userId);
}