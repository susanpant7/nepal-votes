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
    Task<ApiResponse<List<User>>> SearchUsersAsync(string searchText);
}