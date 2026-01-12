namespace NepalVotes.Application.Users;

public interface IUserRefreshTokenService
{
    Task SaveOrUpdateUserRefreshToken(int userId, string refreshToken, int expiryInDays);
}