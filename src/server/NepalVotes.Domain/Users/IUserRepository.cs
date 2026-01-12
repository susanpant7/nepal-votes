namespace NepalVotes.Domain.Users;

public interface IUserRepository
{
    Task<User?> GetByMobileNumberAsync(string mobileNumber);
    Task<User?> GetWithRolesByMobileNumberAsync(string mobileNumber);
}