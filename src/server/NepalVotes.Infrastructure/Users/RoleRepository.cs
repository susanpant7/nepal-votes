using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.Users;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.Users;

public class RoleRepository(ApplicationDbContext context) : IRoleRepository
{
    public async Task<Role?> GetRoleByNameAsync(string roleName)
    {
        return await context.Roles.FirstOrDefaultAsync(r => r.RoleName == roleName);
    }
}