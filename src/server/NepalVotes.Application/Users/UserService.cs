using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Users;

public class UserService(IUserRepository userRepository, IUserRefreshTokenRepository refreshTokenRepository) 
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
            ApiResponse<UserProfile>.ErrorResponse("User not found",404) 
            : 
            ApiResponse<UserProfile>.SuccessResponse(user.ToUserProfile());
    }
    
    public async Task<UserRefreshToken?> GetUserRefreshToken(string refreshToken)
    {
        return await refreshTokenRepository.GetUserRefreshTokenByRefreshTokenAsync(refreshToken);
    }
    
    public async Task<ApiResponse<List<User>>> SearchUsersAsync(string searchText)
    {
        if (string.IsNullOrWhiteSpace(searchText))
        {
            return ApiResponse<List<User>>.SuccessResponse([],"Empty search text");
        }
        var users = await userRepository.SearchUsersAsync(searchText);
        return ApiResponse<List<User>>.SuccessResponse(users);
    }
}