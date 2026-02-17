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
                .Include(vp => vp.Ward)
                    .ThenInclude(w => w.Constituency)
            .FirstOrDefaultAsync(u => u.UserId == userId);
    }
    
    public async Task<List<User>> SearchUsersAsync(string searchText)
    {
        if (string.IsNullOrWhiteSpace(searchText))
            return [];

        searchText = searchText.Trim();

        return await context.Users
            .Where(u => EF.Functions.Like(u.FullNameEn, $"%{searchText}%"))
            .OrderBy(u => u.FullNameEn)
            .Take(100)
            .ToListAsync();
    }
    
    public async Task<bool> AnyByWardIdAsync(int wardId)
    {
        return await context.Users
            .AnyAsync(u => u.WardId == wardId);
    }

    public async Task<int?> GetUserConstituencyIdAsync(int userId)
    {
        return await context.Users
            .Where(u => u.UserId == userId)
            .Select(u => u.Ward.ConstituencyId)
            .FirstOrDefaultAsync();
    }
    public async Task<string?> GetUserConstituencyNameAsync(int userId)
    {
        return await context.Users
            .AsNoTracking()
            .Where(u => u.UserId == userId)
            .Select(u => u.Ward.Constituency != null 
                ? u.Ward.Constituency.ConstituencyNameEn 
                : null)
            .FirstOrDefaultAsync();
    }
    
    public async Task AddUserAsync(User user)
    {
        await context.Users.AddAsync(user);
    }

    public async Task<List<User>> GetByMobileNumberOrNationalIdOrVoterIdAsync(string mobileNumber, string nationalId, string voterId)
    {
        return await context.Users
            .AsNoTracking()
            .Where(x=> x.MobileNumber==mobileNumber || x.NationalIdNumber==nationalId || x.VoterIdNumber==voterId)
            .ToListAsync();
    }
}