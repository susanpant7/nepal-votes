namespace NepalVotes.Domain.Users;

public interface IUserRefreshTokenRepository
{
    Task<UserRefreshToken?> GetUserRefreshTokenByUserIdAsync(int userId);
    Task<UserRefreshToken?> GetUserRefreshTokenByRefreshTokenAsync(string refreshToken);
    Task AddUserRefreshTokenAsync(UserRefreshToken token);
}