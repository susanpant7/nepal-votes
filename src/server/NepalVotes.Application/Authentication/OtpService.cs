using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Authentication;

public class OtpService(IUserOtpRepository otpRepository, IOtpHashingService otpHashingService) : IOtpService
{
    private const int OtpExpirationTimeInMinutes = 2;
    private const int MaxDailyLimit = 3;
    private const int MaxDailyIpLimit = 10;
    private const int ThrottleSeconds = 60;
    private const int MaxVerifyAttempts = 3;
    
    public async Task<ApiResponse<bool>> GenerateAndSaveOtp(string mobile, UserOtpType type, string ipAddress)
    {
        var dayAgo = DateTimeOffset.UtcNow.AddDays(-1);
        var dailyCount = await otpRepository.GetCountAsync(mobile, type, dayAgo);
        // if (dailyCount >= MaxDailyLimit)
        //     return ApiResponse<bool>.ErrorResponse($"Daily limit of {MaxDailyLimit} OTPs reached.", 429);
        //
        // TODO: Confirm this logic
        // var ipDailyCount = await otpRepository.GetCountByIpAsync(ipAddress, dayAgo);
        // if (ipDailyCount >= MaxDailyIpLimit) 
        // {
        //     return ApiResponse<bool>.ErrorResponse("Global request limit reached from this network.", 429);
        // }
        
        // var latest = await otpRepository.GetLatestOtpAsync(mobile, type);
        // if (latest != null && (DateTimeOffset.UtcNow - latest.CreatedAt).TotalSeconds < ThrottleSeconds)
        //     return ApiResponse<bool>.ErrorResponse($"Please wait {ThrottleSeconds} seconds before requesting a new code.", 429);
        
        var plainOtp = new Random().Next(100000, 999999).ToString();

        var hashedOtp = otpHashingService.HashOtp(plainOtp);

        await otpRepository.InvalidateExistingOtpsAsync(mobile, type);
        
        var otpEntry = new UserOtp
        {
            MobileNumber = mobile,
            HashedOtpCode = hashedOtp,
            UserOtpType = type,
            ExpiryDate = DateTimeOffset.UtcNow.AddMinutes(OtpExpirationTimeInMinutes)
        };

        await otpRepository.AddOtpAsync(otpEntry);
        
        return ApiResponse<bool>.SuccessResponse(true, "OTP Generated Successfully: "+ plainOtp, StatusCode.Created );
    }

    public async Task<ApiResponse<bool>> VerifyOtp(string mobile, string providedOtp, UserOtpType type)
    {
        var latestOtp = await otpRepository.GetLatestActiveOtpAsync(mobile, type);
        
        if (latestOtp == null) return ApiResponse<bool>.ErrorResponse("No active OTP found or code expired.", 400);

        if (latestOtp.AttemptCount >= MaxVerifyAttempts)
            return ApiResponse<bool>.ErrorResponse("Too many failed attempts. Please request a new OTP.", 403);
        
        var isVerified = otpHashingService.VerifyOtp(latestOtp.HashedOtpCode, providedOtp);
        
        if (!isVerified)
        {
            latestOtp.AttemptCount++;
            await otpRepository.UpdateOtpAsync(latestOtp);
            
            var remaining = MaxVerifyAttempts - latestOtp.AttemptCount;
            return ApiResponse<bool>.ErrorResponse($"Invalid OTP. {remaining} attempts remaining.", 400);
        }
        
        latestOtp.IsUsed = true;
        await otpRepository.UpdateOtpAsync(latestOtp);
        return ApiResponse<bool>.SuccessResponse(true, "OTP Verified Successfully.");
    }
}