namespace NepalVotes.Domain.Users;

public interface IUserRepository
{
    Task<User?> GetByMobileNumberAsync(string mobileNumber);
    Task<User?> GetUserWithRolesByMobileNumberAsync(string mobileNumber);
    Task<User?> GetUserWithRolesByUserIdAsync(int userId);
    Task<User?> GetUserWithVotingPlaceByUserIdAsync(int userId);
}