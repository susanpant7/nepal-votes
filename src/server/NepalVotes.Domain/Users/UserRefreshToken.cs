namespace NepalVotes.Domain.Users;

public class UserRefreshToken
{
    public int UserRefreshTokenId { get; init; }

    public int UserId { get; init; }
    public User User { get; init; }

    public string RefreshToken { get; set; } = string.Empty;
    public DateTimeOffset RefreshTokenExpiryTime { get; set; }

    public DateTimeOffset CreatedAt { get; init; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? RevokedAt { get; init; }
}