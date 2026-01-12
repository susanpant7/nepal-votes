using Microsoft.Extensions.Configuration;
using NepalVotes.Application.Responses;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Users;

public class AuthService(IConfiguration configuration, IUserService userService)
    : IAuthService
    {
        public async Task<ApiResponse<bool>> GenerateOtp(OtpRequest request)
        {
            // 1. Fetch user by mobile number
            var user = await userService.GetUserByMobileNumber(request.MobileNumber);

            if (user == null)
            {
                // Option A: Return error if user must exist to get an OTP
                return ApiResponse<bool>.ErrorResponse(
                    title: "User Not Found",
                    status: 404,
                    errors: new List<string> { "No account is associated with this mobile number. First register" }
                );
            }

            // 2. Security Check: Ensure user is Approved (Status 3)
            if (user.Status != UserStatus.Approved) // Assuming 3 is Approved based on your data
            {
                return ApiResponse<bool>.ErrorResponse(
                    title: "Account Not Active",
                    status: 403,
                    errors: new List<string> { "Your account is currently pending approval." }
                );
            }

            // 3. Generate a random 6-digit OTP
            // In production, use a cryptographically secure random generator
            int otpCode = new Random().Next(100000, 999999);

            // 4. Logic to save and send OTP
            try 
            {
                // TODO: await _otpService.SaveAndSendAsync(request.MobileNumber, otpCode);
        
                // For development purposes, we return the OTP in the data payload.
                // In production, 'Data' should likely be 0 or a reference ID, not the code itself.
                return ApiResponse<bool>.SuccessResponse(
                    data: true, 
                    title: "OTP sent successfully to your mobile number.",
                    status: 200
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResponse(
                    title: "Provider Error",
                    status: 500,
                    errors: new List<string> { "Failed to send SMS. Please try again later." }
                );
            }
        }
        

    }