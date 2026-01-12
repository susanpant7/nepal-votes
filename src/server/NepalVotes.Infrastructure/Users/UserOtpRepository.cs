using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.Users;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.Users;

public class UserOtpRepository(ApplicationDbContext context) : IUserOtpRepository
{
    public async Task AddOtpAsync(UserOtp otp)
    {
        await context.UserOtps.AddAsync(otp);
    }
    
    public async Task<UserOtp?> GetLatestActiveOtpAsync(int userId, UserOtpType type)
    {
        return await context.UserOtps
            .Where(x => x.UserId == userId && 
                        x.UserOtpType == type && 
                        !x.IsUsed && 
                        x.ExpiryDate > DateTime.UtcNow)
            .OrderByDescending(x => x.CreatedAt)
            .FirstOrDefaultAsync();
    }
    
    public async Task InvalidateExistingOtpsAsync(int userId, UserOtpType type)
    {
        var activeOtps = await context.UserOtps
            .Where(x => x.UserId == userId && x.UserOtpType == type && !x.IsUsed)
            .ToListAsync();

        foreach (var otp in activeOtps)
        {
            otp.IsUsed = true;
        }
    }
}