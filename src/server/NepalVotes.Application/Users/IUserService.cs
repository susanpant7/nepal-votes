using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Users;

public interface IUserService
{
    Task<User?> GetUserByMobileNumber(string mobileNumber);
    Task<User?> GetUserWithRolesByMobileNumber(string mobileNumber);
}