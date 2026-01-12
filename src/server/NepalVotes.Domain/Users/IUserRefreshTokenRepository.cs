namespace NepalVotes.Domain.Users;

public interface IUserRefreshTokenRepository
{
    Task<UserRefreshToken?> GetUserRefreshTokenByUserIdAsync(int userId);
    Task AddUserRefreshTokenAsync(UserRefreshToken token);
}