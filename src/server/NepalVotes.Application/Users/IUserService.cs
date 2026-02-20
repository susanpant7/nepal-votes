using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Users;

public interface IUserService
{
    Task<User?> GetUserByMobileNumber(string mobileNumber);
    Task<User?> GetUserWithRolesByMobileNumber(string mobileNumber);
    Task<User?> GetUserWithRolesByUserId(int userId);
    Task<ApiResponse<UserProfile>> GetUserProfileAsync(int userId);
    Task<UserRefreshToken?> GetUserRefreshToken(string refreshToken);
    Task<ApiResponse<List<UserDropdown>>> SearchUsersAsync(string searchText);
    Task<ApiResponse<bool>> AddUserAsync(AddUserRequest request, bool performerIsSuperAdmin);
    Task<ApiResponse<List<RoleDto>>> GetRolesAsync();
    
    Task<ApiResponse<PagedResult<UserDto>>> GetUsersAsync(
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
        int pageSize);
    Task<ApiResponse<UserDto>> GetUserAsync(int userId);
    Task<ApiResponse<bool>> UpdateUserAsync(int userId, AddUserRequest request, bool performerIsSuperAdmin);
    Task<ApiResponse<bool>> DeleteUserAsync(int userId);
}