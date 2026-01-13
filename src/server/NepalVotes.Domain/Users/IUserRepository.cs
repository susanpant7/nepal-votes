namespace NepalVotes.Domain.Users;

public interface IUserRepository
{
    Task<User?> GetByMobileNumberAsync(string mobileNumber);
    Task<User?> GetUserWithRolesByMobileNumberAsync(string mobileNumber);
    Task<User?> GetUserWithVotingPlaceByUserIdAsync(int userId);
}