using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Application.UserRegistrations;
using NepalVotes.Application.Users;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Authentication;

public class AuthService(IUserService userService, IOtpService otpService,
    ITokenGenerator tokenGenerator, IUserRefreshTokenService refreshTokenService, IUserRegistrationService  userRegistrationService,
    IUnitOfWork unitOfWork)
    : IAuthService
    {
        private const int AccessTokenExpirationInMinutes = 1500;
        private const int RefreshTokenExpirationInDays = 7;
        
        public async Task<ApiResponse<bool>> GenerateOtpForLogin(GenerateOtpRequest request, string ipAddress)
        {
            var user = await userService.GetUserByMobileNumber(request.MobileNumber);
            if (user == null)
            {
                var userRegistration = await userRegistrationService.GetByMobileNumber(request.MobileNumber);
                return userRegistration?.Status switch
                {
                    UserStatus.OtpPending => ApiResponse<bool>.ErrorResponse("Complete the form again", 404),
                    UserStatus.Pending => ApiResponse<bool>.ErrorResponse(
                        "Your status is currently under administrative review.", StatusCode.AlreadyReported),
                    _ => ApiResponse<bool>.ErrorResponse("Voter for this mobile number not found. Please register", 404)
                };
            }
            
            var result =  await otpService.GenerateAndSaveOtp(request.MobileNumber, UserOtpType.Login, ipAddress);
            
            await unitOfWork.SaveChangesAsync();
            
            return result;
        }
        
        public async Task<ApiResponse<TokenResponse>> VerifyOtpForLogin(VerifyOtpRequest request)
        {
            var user = await userService.GetUserWithRolesByMobileNumber(request.MobileNumber);
            if (user == null) return ApiResponse<TokenResponse>.ErrorResponse("User not found", 404);

            var otpVerityResult =  await otpService.VerifyOtp(request.MobileNumber, request.ProvidedOtp, UserOtpType.Login);
            if (!otpVerityResult.Success)
            {
                await unitOfWork.SaveChangesAsync();
                return ApiResponse<TokenResponse>.ErrorResponse(otpVerityResult.Message??"Invalid OTP");
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
        
        public async Task<ApiResponse<TokenResponse>> RefreshTokensAsync(string refreshToken)
        {
            var validateResponse = await ValidateRefreshTokenAsync(refreshToken);
            if (!validateResponse.Success)
                return ApiResponse<TokenResponse>.ErrorResponse(validateResponse.Message??"Unable to refresh token");

            var tokenResponse = await CreateTokenResponse(validateResponse.Data!);
            await unitOfWork.SaveChangesAsync();
            return new ApiResponse<TokenResponse>(tokenResponse);
        }
        
        private async Task<ApiResponse<User>> ValidateRefreshTokenAsync(string refreshToken)
        {
            var userRefreshToken = await userService.GetUserRefreshToken(refreshToken);
            if (userRefreshToken is null)
                return ApiResponse<User>.ErrorResponse("Token does not exist. Invalid refresh token");
            if (userRefreshToken.RefreshTokenExpiryTime <= DateTime.UtcNow )
                return ApiResponse<User>.ErrorResponse("Refresh token expired");
            var user = await userService.GetUserWithRolesByUserId(userRefreshToken.UserId);
            return ApiResponse<User>.SuccessResponse(user!,"Refresh token valid");
        }
        
    }