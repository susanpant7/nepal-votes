using NepalVotes.Application.FileValidations;
using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.MediaFiles;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Users;

public class UserService(IUserRepository userRepository, 
    IUserRefreshTokenRepository refreshTokenRepository,
    IRoleRepository roleRepository,
    IFileValidationService fileValidationService,
    IUnitOfWork unitOfWork) 
    : IUserService
{
    public async Task<User?> GetUserByMobileNumber(string mobileNumber)
    {
        return await userRepository.GetByMobileNumberAsync(mobileNumber);
    }
    
    public async Task<User?> GetUserWithRolesByMobileNumber(string mobileNumber)
    {
        return await userRepository.GetUserWithRolesByMobileNumberAsync(mobileNumber);
    }
    
    public async Task<User?> GetUserWithRolesByUserId(int userId)
    {
        return await userRepository.GetUserWithRolesByUserIdAsync(userId);
    }
    
    public async Task<ApiResponse<UserProfile>> GetUserProfileAsync(int userId)
    {
        var user = await userRepository.GetUserWithVotingPlaceByUserIdAsync(userId);
        return user == null ? 
            ApiResponse<UserProfile>.ErrorResponse("User not found", 404) 
            : 
            ApiResponse<UserProfile>.SuccessResponse(user.ToUserProfile());
    }
    
    public async Task<UserRefreshToken?> GetUserRefreshToken(string refreshToken)
    {
        return await refreshTokenRepository.GetUserRefreshTokenByRefreshTokenAsync(refreshToken);
    }
    
    public async Task<ApiResponse<List<UserDropdown>>> SearchUsersAsync(string searchText)
    {
        if (string.IsNullOrWhiteSpace(searchText))
        {
            return ApiResponse<List<UserDropdown>>.SuccessResponse([], "Empty search text");
        }
        var users = await userRepository.SearchUsersAsync(searchText);
        return ApiResponse<List<UserDropdown>>.SuccessResponse(users.Select(u => u.ToUserDropdown()).ToList());
    }

    public async Task<ApiResponse<bool>> AddUserAsync(AddUserRequest request, bool performerIsSuperAdmin)
    {
        // 1. Validate Admin Role Assignment
        if (!performerIsSuperAdmin && 
            request.Roles.Any(r => r.Equals(RoleName.Admin, StringComparison.OrdinalIgnoreCase) || 
                                    r.Equals(RoleName.SuperAdmin, StringComparison.OrdinalIgnoreCase)))
        {
            return ApiResponse<bool>.ErrorResponse("Only SuperAdmins can assign administrative roles.", 403);
        }

        // 2. Validate Documents
        if (request.Documents != null)
        {
            foreach (var doc in request.Documents)
            {
                var validation = fileValidationService.Validate(doc.FileName, doc.FileLength, doc.DocumentType);
                if (!validation.IsValid) return ApiResponse<bool>.ErrorResponse(validation.Message, 400);
            }
        }

        // 2. Check existing user
        var existingUsers = await userRepository.GetByMobileNumberOrNationalIdOrVoterIdAsync(
            request.MobileNumber, request.NationalIdNumber, request.VoterIdNumber);

        if (existingUsers.Any())
        {
            return ApiResponse<bool>.ErrorResponse("User already exists with mobile number, national id or voter id", 400);
        }

        // 3. Fetch Roles
        var roles = new List<Role>();
        foreach (var roleName in request.Roles)
        {
            var role = await roleRepository.GetRoleByNameAsync(roleName);
            if (role != null)
            {
                roles.Add(role);
            }
        }

        // 4. Create User
        var user = new User
        {
            FirstNameEn = request.FirstNameEn,
            MiddleNameEn = request.MiddleNameEn,
            LastNameEn = request.LastNameEn,
            FirstNameNp = request.FirstNameNp,
            MiddleNameNp = request.MiddleNameNp,
            LastNameNp = request.LastNameNp,
            DateOfBirth = request.DateOfBirth,
            MobileNumber = request.MobileNumber,
            NationalIdNumber = request.NationalIdNumber,
            VoterIdNumber = request.VoterIdNumber,
            WardId = request.WardId,
            Roles = roles,
            Status = request.Status ?? UserStatus.Approved,
            RequestDate = DateTimeOffset.UtcNow,
            ApprovedDate = request.Status == UserStatus.Approved ? DateTimeOffset.UtcNow : null,
            UserDocuments = new List<UserDocument>()
        };

        // 5. Map Documents
        if (request.Documents != null)
        {
            foreach (var doc in request.Documents)
            {
                user.UserDocuments.Add(new UserDocument
                {
                    DocumentType = doc.DocumentType,
                    UserDocumentMediaFile = new MediaFile
                    {
                        Content = doc.Content,
                        ContentType = doc.ContentType,
                        FileName = doc.FileName,
                        Size = doc.FileLength
                    }
                });
            }
        }

        await userRepository.AddUserAsync(user);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "User added successfully");
    }

    public async Task<ApiResponse<List<RoleDto>>> GetRolesAsync()
    {
        var roles = await roleRepository.GetAllAsync();
        var roleDtos = roles.Select(r => new RoleDto
        {
            RoleId = r.RoleId,
            RoleName = r.RoleName
        }).ToList();

        return ApiResponse<List<RoleDto>>.SuccessResponse(roleDtos);
    }

    public async Task<ApiResponse<PagedResult<UserDto>>> GetUsersAsync(
        int? userId,
        string? mobileNumber,
        string? nationalId,
        string? voterId,
        int? provinceId, 
        int? districtId, 
        int? municipalityId,
        string? role,
        int? roleId,
        UserStatus? status,
        int page,
        int pageSize)
    {
        var (users, totalCount) = await userRepository.GetFilteredUsersAsync(
            userId, mobileNumber, nationalId, voterId, 
            provinceId, districtId, municipalityId, 
            role, roleId, status,
            page, pageSize);

        var userDtos = users.Select(u => new UserDto
        {
            UserId = u.UserId,
            FirstNameEn = u.FirstNameEn,
            MiddleNameEn = u.MiddleNameEn,
            LastNameEn = u.LastNameEn,
            FirstNameNp = u.FirstNameNp,
            MiddleNameNp = u.MiddleNameNp,
            LastNameNp = u.LastNameNp,
            FullNameEn = u.FullNameEn,
            FullNameNp = u.FullNameNp,
            MobileNumber = u.MobileNumber,
            NationalIdNumber = u.NationalIdNumber,
            VoterIdNumber = u.VoterIdNumber,
            DateOfBirth = u.DateOfBirth,
            Age = u.Age,
            WardId = u.WardId,
            WardName = u.Ward?.WardName,
            WardNumber = u.Ward?.WardNumber,
            MunicipalityName = u.Ward?.Municipality?.MunicipalityNameEn,
            DistrictName = u.Ward?.Municipality?.District?.DistrictNameEn,
            ProvinceName = u.Ward?.Municipality?.District?.Province?.ProvinceNameEn,
            Roles = u.Roles?.Select(r => r.RoleName).ToList() ?? new List<string>(),
            Status = u.Status.ToString(),
            RequestDate = u.RequestDate
        }).ToList();

        var paginatedResult = PagedResult<UserDto>.Create(userDtos, page, pageSize, totalCount);
        return ApiResponse<PagedResult<UserDto>>.SuccessResponse(paginatedResult);
    }

    public async Task<ApiResponse<UserDto>> GetUserAsync(int userId)
    {
        var fullUser = await userRepository.GetUserWithVotingPlaceByUserIdAsync(userId);
        if (fullUser == null) return ApiResponse<UserDto>.ErrorResponse("User not found", 404);

        var dto = new UserDto
        {
            UserId = fullUser.UserId,
            FirstNameEn = fullUser.FirstNameEn,
            MiddleNameEn = fullUser.MiddleNameEn,
            LastNameEn = fullUser.LastNameEn,
            FirstNameNp = fullUser.FirstNameNp,
            MiddleNameNp = fullUser.MiddleNameNp,
            LastNameNp = fullUser.LastNameNp,
            FullNameEn = fullUser.FullNameEn,
            FullNameNp = fullUser.FullNameNp,
            MobileNumber = fullUser.MobileNumber,
            NationalIdNumber = fullUser.NationalIdNumber,
            VoterIdNumber = fullUser.VoterIdNumber,
            DateOfBirth = fullUser.DateOfBirth,
            Age = fullUser.Age,
            WardId = fullUser.WardId,
            WardName = fullUser.Ward?.WardName,
            WardNumber = fullUser.Ward?.WardNumber,
            MunicipalityName = fullUser.Ward?.Municipality?.MunicipalityNameEn,
            DistrictName = fullUser.Ward?.Municipality?.District?.DistrictNameEn,
            ProvinceName = fullUser.Ward?.Municipality?.District?.Province?.ProvinceNameEn,
            Roles = fullUser.Roles?.Select(r => r.RoleName).ToList() ?? new List<string>(),
            Status = fullUser.Status.ToString(),
            RequestDate = fullUser.RequestDate,
            Documents = fullUser.UserDocuments?.Select(d => new DocumentUploadRequest
            {
                DocumentType = d.DocumentType,
                Content = d.UserDocumentMediaFile.Content,
                ContentType = d.UserDocumentMediaFile.ContentType,
                FileName = d.UserDocumentMediaFile.FileName,
                FileLength = d.UserDocumentMediaFile.Size
            }).ToList() ?? new List<DocumentUploadRequest>()
        };

        return ApiResponse<UserDto>.SuccessResponse(dto);
    }

    public async Task<ApiResponse<bool>> UpdateUserAsync(int userId, AddUserRequest request, bool performerIsSuperAdmin)
    {
        // 1. Validate Admin Role Assignment
        if (!performerIsSuperAdmin && 
            request.Roles.Any(r => r.Equals(RoleName.Admin, StringComparison.OrdinalIgnoreCase) || 
                                    r.Equals(RoleName.SuperAdmin, StringComparison.OrdinalIgnoreCase)))
        {
            return ApiResponse<bool>.ErrorResponse("Only SuperAdmins can assign administrative roles.", 403);
        }

        var user = await userRepository.GetUserWithRolesByUserIdAsync(userId);
        if (user == null) return ApiResponse<bool>.ErrorResponse("User not found", 404);

        // Check for duplicates (excluding current user)
        var existingUsers = await userRepository.GetByMobileNumberOrNationalIdOrVoterIdAsync(
            request.MobileNumber, request.NationalIdNumber, request.VoterIdNumber);
        
        if (existingUsers.Any(u => u.UserId != userId))
        {
            return ApiResponse<bool>.ErrorResponse("Another user already exists with this mobile number, national id or voter id", 400);
        }

        // Update basic info
        user.FirstNameEn = request.FirstNameEn;
        user.MiddleNameEn = request.MiddleNameEn;
        user.LastNameEn = request.LastNameEn;
        user.FirstNameNp = request.FirstNameNp;
        user.MiddleNameNp = request.MiddleNameNp;
        user.LastNameNp = request.LastNameNp;
        user.DateOfBirth = request.DateOfBirth;
        user.MobileNumber = request.MobileNumber;
        user.NationalIdNumber = request.NationalIdNumber;
        user.VoterIdNumber = request.VoterIdNumber;
        user.WardId = request.WardId;
        user.Status = request.Status ?? user.Status;

        // Update roles
        user.Roles.Clear();
        foreach (var roleName in request.Roles)
        {
            var role = await roleRepository.GetRoleByNameAsync(roleName);
            if (role != null) user.Roles.Add(role);
        }

        // Update documents
        if (request.Documents != null)
        {
            foreach (var doc in request.Documents)
            {
                // Remove existing document of the same type if it exists
                var existingDoc = user.UserDocuments.FirstOrDefault(d => d.DocumentType == doc.DocumentType);
                if (existingDoc != null)
                {
                    user.UserDocuments.Remove(existingDoc);
                }

                // Add the new document
                user.UserDocuments.Add(new UserDocument
                {
                    DocumentType = doc.DocumentType,
                    UserDocumentMediaFile = new MediaFile
                    {
                        Content = doc.Content,
                        ContentType = doc.ContentType,
                        FileName = doc.FileName,
                        Size = doc.FileLength
                    }
                });
            }
        }

        await userRepository.UpdateUserAsync(user);
        await unitOfWork.SaveChangesAsync();

        return ApiResponse<bool>.SuccessResponse(true, "User updated successfully");
    }

    public async Task<ApiResponse<bool>> DeleteUserAsync(int userId)
    {
        var user = await userRepository.GetUserWithRolesByUserIdAsync(userId);
        if (user == null) return ApiResponse<bool>.ErrorResponse("User not found", 404);

        await userRepository.DeleteUserAsync(user);
        await unitOfWork.SaveChangesAsync();

        return ApiResponse<bool>.SuccessResponse(true, "User deleted successfully");
    }
}