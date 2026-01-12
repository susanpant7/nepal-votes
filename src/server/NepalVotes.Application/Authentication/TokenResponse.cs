namespace NepalVotes.Application.Authentication;

public class TokenResponse
{
    public required string AccessToken { get; set; }
    public required string RefreshToken { get; set; }
    public int AccessTokenExpiryInMinute { get; set; }
    public int RefreshTokenExpiryInDays { get; set; }
}