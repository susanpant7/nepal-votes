using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using NepalVotes.Application.Authentication;
using NepalVotes.Application.Configuration;
using NepalVotes.Domain.Users;

namespace NepalVotes.Infrastructure.Authentication;

public class TokenGenerator(AppSetting appSetting) : ITokenGenerator
{
    public string GenerateAccessToken(User user, int accessTokenExpirationInMinutes)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.FirstName + user.MiddleName + user.LastName),
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.MobilePhone, user.MobileNumber),
        };
        foreach (var role in user.Roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role.RoleName));
        }
        
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(appSetting.AuthSetting.Secret));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        var tokenDescriptor = new JwtSecurityToken(
            issuer: appSetting.AuthSetting.Issuer,
            audience: appSetting.AuthSetting.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(accessTokenExpirationInMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
    }

    public string GenerateRefreshToken(User user)
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }
}