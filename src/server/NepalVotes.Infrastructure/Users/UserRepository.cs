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
    
    public async Task<User?> GetUserWithRolesByUserIdAsync(int userId)
    {
        return await context.Users
            .Include(u => u.Roles)
            .FirstOrDefaultAsync(u => u.UserId == userId);
    }
    
    public async Task<User?> GetUserWithVotingPlaceByUserIdAsync(int userId)
    {
        return await context.Users
            .Include(u => u.VotingPlace)
            .FirstOrDefaultAsync(u => u.UserId == userId);
    }
    
    public async Task<List<User>> SearchUsersAsync(string searchText)
    {
        if (string.IsNullOrWhiteSpace(searchText))
            return [];

        searchText = searchText.Trim();

        return await context.Users
            .Where(u => EF.Functions.Like(u.FullName, $"%{searchText}%"))
            .OrderBy(u => u.FullName)
            .Take(100)
            .ToListAsync();
    }
    
    public async Task<bool> AnyByVotingPlaceIdAsync(int votingPlaceId)
    {
        return await context.Users
            .AnyAsync(u => u.VotingPlaceId == votingPlaceId);
    }

    public async Task<int?> GetUserConstituencyIdAsync(int userId)
    {
        return await context.Users
            .Where(u => u.UserId == userId)
            .Select(u => u.VotingPlace.Ward.ConstituencyId)
            .FirstOrDefaultAsync();
    }
}