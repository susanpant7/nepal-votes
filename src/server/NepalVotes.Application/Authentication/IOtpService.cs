using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Authentication;

public interface IOtpService
{
    Task<ApiResponse<bool>> GenerateAndSaveOtp(string mobile, UserOtpType type, string ipAddress);
    Task<ApiResponse<bool>> VerifyOtp(string mobile, string providedOtp, UserOtpType type);
}