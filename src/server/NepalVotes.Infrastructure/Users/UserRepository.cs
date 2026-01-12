using NepalVotes.Domain.Users;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.Users;

using Microsoft.EntityFrameworkCore;

public class UserRepository(ApplicationDbContext context) : IUserRepository
{
    public async Task<User?> GetByMobileNumberAsync(string mobileNumber)
    {
        return await context.Users
            .Include(u => u.Roles)             // Eager load Roles
            .Include(u => u.VotingPlace)       // Load Voting Location
            .FirstOrDefaultAsync(u => u.MobileNumber == mobileNumber);
    }
}