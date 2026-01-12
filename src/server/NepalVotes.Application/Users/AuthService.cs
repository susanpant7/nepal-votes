using Microsoft.Extensions.Configuration;
using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Users;

public class AuthService(IConfiguration configuration, IUserService userService, IOtpService otpService)
    : IAuthService
    {
        public async Task<ApiResponse<bool>> GenerateOtpForLogin(OtpRequest request)
        {
            var user = await userService.GetUserByMobileNumber(request.MobileNumber);
            if (user == null) return ApiResponse<bool>.ErrorResponse("User not found", 404);

            return await otpService.GenerateAndSaveOtp(request.MobileNumber, UserOtpType.Login, user.UserId);
        }
        
        public async Task<ApiResponse<bool>> VerifyOtpForLogin(OtpRequest request)
        {
            var user = await userService.GetUserByMobileNumber(request.MobileNumber);
            if (user == null) return ApiResponse<bool>.ErrorResponse("User not found", 404);

            return await otpService.VerifyOtp(request.MobileNumber, request.ProvidedOtp, UserOtpType.Login, user.UserId);
        }

    }