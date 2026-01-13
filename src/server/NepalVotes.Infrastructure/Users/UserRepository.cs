using NepalVotes.Domain.Users;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.Users;

using Microsoft.EntityFrameworkCore;

public class UserRepository(ApplicationDbContext context) : IUserRepository
{
    public async Task<User?> GetByMobileNumberAsync(string mobileNumber)
    {
        return await context.Users
            .FirstOrDefaultAsync(u => u.MobileNumber == mobileNumber);
    }
    
    public async Task<User?> GetUserWithRolesByMobileNumberAsync(string mobileNumber)
    {
        return await context.Users
            .Include(u => u.Roles)             // Eager load Roles
            .FirstOrDefaultAsync(u => u.MobileNumber == mobileNumber);
    }
    
    public async Task<User?> GetUserWithVotingPlaceByUserIdAsync(int userId)
    {
        return await context.Users
            .Include(u => u.VotingPlace)
            .FirstOrDefaultAsync(u => u.UserId == userId);
    }
}