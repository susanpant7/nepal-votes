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
    
    public async Task UpdateOtpAsync(UserOtp otp)
    {
        context.UserOtps.Update(otp);
        await Task.CompletedTask;
    }
    
    public async Task<int> GetCountAsync(string mobile, UserOtpType type, DateTimeOffset since)
    {
        return await context.UserOtps
            .CountAsync(x => x.MobileNumber == mobile 
                             && x.UserOtpType == type 
                             && x.CreatedAt >= since);
    }
    
    public async Task<UserOtp?> GetLatestOtpAsync(string mobile, UserOtpType type)
    {
        return await context.UserOtps
            .Where(x => x.MobileNumber == mobile && x.UserOtpType == type)
            .OrderByDescending(x => x.CreatedAt)
            .FirstOrDefaultAsync();
    }
    
    public async Task<UserOtp?> GetLatestActiveOtpAsync(string mobileNumber, UserOtpType type)
    {
        return await context.UserOtps
            .Where(x => x.MobileNumber == mobileNumber && 
                        x.UserOtpType == type && 
                        !x.IsUsed && 
                        x.ExpiryDate > DateTimeOffset.UtcNow)
            .OrderByDescending(x => x.CreatedAt)
            .FirstOrDefaultAsync();
    }
    
    public async Task InvalidateExistingOtpsAsync(string mobileNumber, UserOtpType type)
    {
        var activeOtps = await context.UserOtps
            .Where(x => x.MobileNumber == mobileNumber && x.UserOtpType == type && !x.IsUsed)
            .ToListAsync();

        foreach (var otp in activeOtps)
        {
            otp.IsUsed = true;
        }
    }
    
    public async Task<int> GetCountByMobileAsync(string mobileNumber, UserOtpType type, DateTimeOffset since)
    {
        return await context.UserOtps
            .CountAsync(l => l.MobileNumber == mobileNumber 
                             && l.UserOtpType == type 
                             && l.CreatedAt >= since);
    }

    public async Task<int> GetCountByIpAsync(string ipAddress, DateTimeOffset since)
    {
        return await context.UserOtps
            .CountAsync(l => l.IpAddress == ipAddress 
                             && l.CreatedAt >= since);
    }
}