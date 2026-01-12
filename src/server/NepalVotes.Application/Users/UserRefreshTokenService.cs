using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Users;

public class UserRefreshTokenService (IUserRefreshTokenRepository refreshTokenRepository) : IUserRefreshTokenService
{
    public async Task SaveOrUpdateUserRefreshToken(int userId, string refreshToken, int expiryInDays)
    {
        // fetch login token 
        var userRefreshToken = await refreshTokenRepository.GetUserRefreshTokenByUserIdAsync(userId);

        if (userRefreshToken == null)
        {
            userRefreshToken = new UserRefreshToken
            {
                UserId = userId,
                RefreshToken = refreshToken,
                RefreshTokenExpiryTime = DateTimeOffset.UtcNow.AddDays(expiryInDays)
            };

            await refreshTokenRepository.AddUserRefreshTokenAsync(userRefreshToken);
        }
        else
        {
            userRefreshToken.RefreshToken = refreshToken;
            userRefreshToken.RefreshTokenExpiryTime = DateTimeOffset.UtcNow.AddDays(expiryInDays);
        }

    }
}