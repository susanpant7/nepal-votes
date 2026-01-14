using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.Users;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.Users;

public class UserRefreshTokenRepository (ApplicationDbContext context) : IUserRefreshTokenRepository
{
    public async Task<UserRefreshToken?> GetUserRefreshTokenByUserIdAsync(int userId)
    {
        return await context.UserRefreshTokens
            .FirstOrDefaultAsync(x => x.UserId == userId);
    }

    public async Task<UserRefreshToken?> GetUserRefreshTokenByRefreshTokenAsync(string refreshToken)
    {
        return await context.UserRefreshTokens
            .FirstOrDefaultAsync(x => x.RefreshToken == refreshToken
            && x.RefreshTokenExpiryTime > DateTime.UtcNow);
    }
    
    public async Task AddUserRefreshTokenAsync(UserRefreshToken token)
    {
        await context.UserRefreshTokens.AddAsync(token);
    }
}