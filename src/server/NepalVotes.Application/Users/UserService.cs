using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Users;

public class UserService(IUserRepository userRepository) : IUserService
{
    public async Task<User?> GetUserByMobileNumber(string mobileNumber)
    {
        return await userRepository.GetByMobileNumberAsync(mobileNumber);
    }
    
    public async Task<User?> GetUserWithRolesByMobileNumber(string mobileNumber)
    {
        return await userRepository.GetUserWithRolesByMobileNumberAsync(mobileNumber);
    }
    
    public async Task<ApiResponse<UserProfile>> GetUserProfileAsync(int userId)
    {
        var user = await userRepository.GetUserWithVotingPlaceByUserIdAsync(userId);
        return user == null ? 
            ApiResponse<UserProfile>.ErrorResponse("User not found",404) 
            : 
            ApiResponse<UserProfile>.SuccessResponse(user.ToUserProfile());
    }
}