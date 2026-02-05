using NepalVotes.Application.Authentication;
using NepalVotes.Application.FileValidations;
using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.UserRegistrations;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.UserRegistrations;

public class UserRegistrationService(
    IUserRegistrationRepository registrationRepo, 
    IFileValidationService fileValidationService, 
    IOtpService otpService, 
    IUnitOfWork unitOfWork)
    : IUserRegistrationService
{
    public async Task<ApiResponse<bool>> RegisterAsync(RegisterUserRequest request, string ipAddress)
    {
        foreach (var doc in request.Documents)
        {
            var fileValidationResponse = fileValidationService.Validate(doc.FileName, doc.FileLength, doc.DocumentType);
            if (!fileValidationResponse.IsValid) return ApiResponse<bool>.ErrorResponse(fileValidationResponse.Message);
        }

        var existingUserRegistration = await registrationRepo.GetByMobileNumberAsync(request.MobileNumber);
        // if (existingUserRegistration is { Status: UserStatus.Pending })
        //     return ApiResponse<bool>.ErrorResponse("Registration already pending admin approval.", StatusCode.Conflict);

        var otpResponse = await otpService.GenerateAndSaveOtp(request.MobileNumber, UserOtpType.Registration, ipAddress);
        if (!otpResponse.Success)
            return ApiResponse<bool>.ErrorResponse(otpResponse.Message??"Error in generating OTP", otpResponse.StatusCode);

        // if (existingUserRegistration != null) 
        //     await registrationRepo.DeleteAsync(existingUserRegistration);
        
        var registration = new UserRegistration
        {
            FirstName = request.FirstName,
            MiddleName = request.MiddleName,
            LastName = request.LastName,
            DateOfBirth = request.DateOfBirth,
            MobileNumber = request.MobileNumber,
            NationalIdNumber = request.NationalIdNumber,
            VotingPlaceId = request.VotingPlaceId,
            Status = UserStatus.OtpPending,
            RequestDate = DateTimeOffset.UtcNow,
            UserRegistrationDocuments = request.Documents.Select(d => new UserRegistrationDocument
            {
                DocumentType = d.DocumentType,
                Content = d.Content,
                ContentType = d.ContentType,
                FileName = d.FileName,
                Size = d.FileLength
            }).ToList()
        };

        await registrationRepo.AddAsync(registration);
        
        await unitOfWork.SaveChangesAsync();

        return otpResponse;
    }

    public async Task<ApiResponse<bool>> VerifyOtpAsync(VerifyOtpRequest request)
    {
        var registration = await registrationRepo.GetLatestActiveRegistrationAsync(request.MobileNumber);
        if (registration == null) 
            return ApiResponse<bool>.ErrorResponse("No registration record found for this number.", 404);

        var otpResult = await otpService.VerifyOtp(request.MobileNumber, request.ProvidedOtp, UserOtpType.Registration);
        
        if (!otpResult.Success)
        {
            await unitOfWork.SaveChangesAsync();
            return ApiResponse<bool>.ErrorResponse(otpResult.Message??"Error in Verifying OTP", otpResult.StatusCode);
        }
        await registrationRepo.DeleteOldRegistrationsExceptLatestAsync(request.MobileNumber,registration.UserRegistrationId);
        
        // Update Registration status to Pending (ready for Admin)
        registration.Status = UserStatus.Pending;
        await registrationRepo.UpdateAsync(registration);
        await unitOfWork.SaveChangesAsync();

        return ApiResponse<bool>.SuccessResponse(true, "Mobile verified successfully. Awaiting admin review.");
    }

    public async Task<ApiResponse<bool>> ReGenerateOtpForRegistration(GenerateOtpRequest request, string ipAddress)
    {
        var existing = await registrationRepo.GetLatestActiveRegistrationAsync(request.MobileNumber);
        if (existing == null) 
            return ApiResponse<bool>.ErrorResponse("Registration record not found.", 404);

        if (existing.Status == UserStatus.Pending)
            return ApiResponse<bool>.ErrorResponse("Registration is already under review.", 409);

        var otpResult = await otpService.GenerateAndSaveOtp(request.MobileNumber, UserOtpType.Registration, ipAddress);
        
        await unitOfWork.SaveChangesAsync();
        return otpResult;
    }

    public async Task<UserRegistration?> GetByMobileNumber(string mobileNumber)
    {
        return await registrationRepo.GetByMobileNumberAsync(mobileNumber);
    }
}