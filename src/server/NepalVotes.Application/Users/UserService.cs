using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Users;

public class UserService(IUserRepository userRepository) : IUserService
{
    public async Task<User?> GetUserByMobileNumber(string mobileNumber)
    {
        return await userRepository.GetByMobileNumberAsync(mobileNumber);
    }
    
}