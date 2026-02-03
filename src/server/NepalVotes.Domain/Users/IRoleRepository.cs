namespace NepalVotes.Domain.Users;

public interface IRoleRepository
{
    Task<Role?> GetRoleByNameAsync(string roleName);
}