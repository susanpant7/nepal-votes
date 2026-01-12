using Microsoft.Extensions.Configuration;
using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Application.Users;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Authentication;

public class AuthService(IConfiguration configuration, IUserService userService, IOtpService otpService,
    ITokenGenerator tokenGenerator, IUserRefreshTokenService refreshTokenService, IUnitOfWork unitOfWork)
    : IAuthService
    {
        private const int AccessTokenExpirationInMinutes = 15;
        private const int RefreshTokenExpirationInDays = 7;
        
        public async Task<ApiResponse<bool>> GenerateOtpForLogin(GenerateOtpRequest request)
        {
            var user = await userService.GetUserByMobileNumber(request.MobileNumber);
            if (user == null) return ApiResponse<bool>.ErrorResponse("User not found", 404);

            var result =  await otpService.GenerateAndSaveOtp(request.MobileNumber, UserOtpType.Login, user.UserId);
            await unitOfWork.SaveChangesAsync();
            return result;
        }
        
        public async Task<ApiResponse<TokenResponse>> VerifyOtpForLogin(VerifyOtpRequest request)
        {
            var user = await userService.GetUserWithRolesByMobileNumber(request.MobileNumber);
            if (user == null) return ApiResponse<TokenResponse>.ErrorResponse("User not found", 404);

            var otpVerityResult =  await otpService.VerifyOtp(request.MobileNumber, request.ProvidedOtp, UserOtpType.Login, user.UserId);
            if (!otpVerityResult.Success)
            {
                return ApiResponse<TokenResponse>.ErrorResponse(otpVerityResult.Message??"Error while verifying Otp", 404);;
            }
            
            // generate jwt with refresh token
            var tokenResponse = await CreateTokenResponse(user);
            await unitOfWork.SaveChangesAsync();
            return ApiResponse<TokenResponse>.SuccessResponse(tokenResponse, "OTP Verified. Login Successful");
        }
        
        private async Task<TokenResponse> CreateTokenResponse(User user)
        {
            var accessToken = tokenGenerator.GenerateAccessToken(user, AccessTokenExpirationInMinutes);
            var refreshToken = tokenGenerator.GenerateRefreshToken(user);
            await refreshTokenService.SaveOrUpdateUserRefreshToken(user.UserId, refreshToken,
                RefreshTokenExpirationInDays);
            
            return new TokenResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                AccessTokenExpiryInMinute = AccessTokenExpirationInMinutes,
                RefreshTokenExpiryInDays =  RefreshTokenExpirationInDays
            };
        }
        
    }