using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.MediaFiles;
using NepalVotes.Domain.UserRegistrations;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.UserRegistrations;

public class RegisteredUsersManagementService (IUserRegistrationRepository registrationRepository, IRoleRepository roleRepository, 
    IUserRepository userRepository, IUnitOfWork unitOfWork) : IRegisteredUsersManagementService
{
    public async Task<ApiResponse<IEnumerable<UserRegistrationListItem>>> GetRegisteredUsersByDistrict(int districtId)
    {
        var registrations = await registrationRepository.GetByDistrictIdAsync(districtId);

        if (registrations.Count==0)
            return ApiResponse<IEnumerable<UserRegistrationListItem>>.SuccessResponse([],"No records found for this district.", 404);

        var listItems = registrations.Select(u => u.ToListItem()).ToList();
        return ApiResponse<IEnumerable<UserRegistrationListItem>>.SuccessResponse(listItems);
    }
    
    public async Task<ApiResponse<UserRegistrationReviewDetail>> GetReviewDetailsAsync(int id)
    {
        var registration = await registrationRepository.GetRegistrationWithGeographicDetailsForReviewAsync(id);

        if(registration == null) return ApiResponse<UserRegistrationReviewDetail>.ErrorResponse("User registration record  found", 404);
        
        if (registration.UserRegistrationDocuments.All(x => x.DocumentType != UserDocumentType.NationalIdentity))
            ApiResponse<UserRegistrationReviewDetail>.ErrorResponse("National Identity document not found.", 404);
        
        return ApiResponse<UserRegistrationReviewDetail>.SuccessResponse(registration.ToReviewDetails());
    }
    
    public async Task<ApiResponse<bool>> ApproveAsync(UserRegistrationReviewRequest request, int approvedByUserId)
    {
        var registration = await registrationRepository.GetByIdWithDocumentsAsync(request.UserRegistrationId);
        if (registration == null) return ApiResponse<bool>.ErrorResponse("User Registration Not found", 404);
      
        var existingUsers = await userRepository.GetByMobileNumberOrNationalIdOrVoterIdAsync(registration.MobileNumber, registration.NationalIdNumber, registration.VoterIdNumber);

        if (existingUsers.Count != 0)
        {
            var mobileConflict = existingUsers.FirstOrDefault(u => u.MobileNumber == registration.MobileNumber);
            var nidConflict = existingUsers.FirstOrDefault(u => u.NationalIdNumber == registration.NationalIdNumber);
            var vidConflict = existingUsers.FirstOrDefault(u => u.VoterIdNumber == registration.VoterIdNumber);

            var conflictingUsers = existingUsers.Select(u => u.UserId).Distinct().Count();
            if (conflictingUsers > 1)
            {
                return ApiResponse<bool>.ErrorResponse(
                    "The provided details (Mobile, National ID, or Voter ID) conflict with multiple existing accounts.", 409);
            }

            if (mobileConflict != null)
                return ApiResponse<bool>.ErrorResponse($"The mobile number {registration.MobileNumber} is already registered.", 409);

            if (nidConflict != null)
                return ApiResponse<bool>.ErrorResponse($"The National ID {registration.NationalIdNumber} is already registered.", 409);

            if (vidConflict != null)
                return ApiResponse<bool>.ErrorResponse($"The Voter ID {registration.VoterIdNumber} is already registered.", 409);
        }
        var voterRole = await roleRepository.GetRoleByNameAsync(RoleName.Voter);
        if (voterRole == null) return ApiResponse<bool>.ErrorResponse("Voter role configuration missing", 500);
        
        var newUser = new User
        {
            FirstName = registration.FirstName,
            MiddleName = registration.MiddleName ?? string.Empty,
            LastName = registration.LastName,
            DateOfBirth = registration.DateOfBirth,
            MobileNumber = registration.MobileNumber,
            NationalIdNumber =  registration.NationalIdNumber,
            VoterIdNumber =  registration.VoterIdNumber,
            Status = UserStatus.Approved,
            RequestDate = registration.RequestDate,
            ApprovedDate = DateTimeOffset.UtcNow,
            ApprovedByUserId = approvedByUserId,
            VotingPlaceId = registration.VotingPlaceId,
            Roles = new List<Role> { voterRole },
            UserDocuments = registration.UserRegistrationDocuments.Select(regDoc => new UserDocument
            {
                DocumentType = regDoc.DocumentType,
                UserDocumentMediaFile = new MediaFile
                {
                    Content = regDoc.Content,
                    ContentType = regDoc.ContentType,
                    FileName = regDoc.FileName,
                    Size = regDoc.Size
                }
            }).ToList()
        };
        
        registration.Status = UserStatus.Approved;
        registration.ReviewComment = request.ReviewComment + " \n Approved by Administrator";
        
        try 
        {
            await userRepository.AddUserAsync(newUser);
            await registrationRepository.UpdateAsync(registration);
        
            await unitOfWork.SaveChangesAsync();
        
            return ApiResponse<bool>.SuccessResponse(true, "Registration approved and User account created.");
        }
        catch (Exception ex)
        {
            // Log ex
            return ApiResponse<bool>.ErrorResponse("An error occurred during account migration.", 500);
        }
        
    }

    public async Task<ApiResponse<bool>> RejectAsync(UserRegistrationReviewRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.ReviewComment))
            return ApiResponse<bool>.ErrorResponse("Comment is required for rejection.");

        var registration = await registrationRepository.GetRegistrationByIdAsync(request.UserRegistrationId);
        if (registration == null) return ApiResponse<bool>.ErrorResponse("Not found", 404);

        registration.Status = UserStatus.Rejected;
        registration.ReviewComment = request.ReviewComment;

        await registrationRepository.UpdateAsync(registration);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "Registration rejected.");
    }
}