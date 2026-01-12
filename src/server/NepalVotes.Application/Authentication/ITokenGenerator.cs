using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Authentication;

public interface ITokenGenerator
{
    string GenerateAccessToken(User user, int accessTokenExpirationInMinutes);
    string GenerateRefreshToken(User user);
}