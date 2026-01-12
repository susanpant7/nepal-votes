using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Authentication;

public class OtpService(IUserRepository userRepository, IUserOtpRepository otpRepository, 
    IOtpHashingService otpHashingService, IUnitOfWork unitOfWork) : IOtpService
{
    public async Task<ApiResponse<bool>> GenerateAndSaveOtp(string mobile, UserOtpType type,  int userId)
    {
        var plainOtp = new Random().Next(100000, 999999).ToString();

        var hashedOtp = otpHashingService.HashOtp(plainOtp);

        await otpRepository.InvalidateExistingOtpsAsync(userId, type);
        
        var otpEntry = new UserOtp
        {
            UserId = userId,
            HashedOtpCode = hashedOtp,
            UserOtpType = type,
            ExpiryDate = DateTimeOffset.UtcNow.AddMinutes(1)
        };

        await otpRepository.AddOtpAsync(otpEntry);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "OTP Generated Successfully: "+ plainOtp );
    }

    public async Task<ApiResponse<bool>> VerifyOtp(string mobile, string providedOtp, UserOtpType type, int userId)
    {
        var latestOtp = await otpRepository.GetLatestActiveOtpAsync(userId, type);
        if (latestOtp == null) return ApiResponse<bool>.ErrorResponse("No active OTP found", 400);

        var isVerified = otpHashingService.VerifyOtp(latestOtp.HashedOtpCode, providedOtp);
        
        if (!isVerified) return ApiResponse<bool>.ErrorResponse("OTP Not Verified");
        
        latestOtp.IsUsed = true;
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "OTP Verified");
    }
}