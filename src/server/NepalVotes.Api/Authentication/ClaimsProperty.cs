using System.Security.Claims;
using NepalVotes.Domain.Exceptions;

namespace NepalVotes.Api.Authentication;

public static class ClaimsProperty
{
    extension(ClaimsPrincipal user)
    {
        public int UserId()
        {
            var claimValue = user.FindFirst(ClaimField.UserId)?.Value;
    
            if (string.IsNullOrEmpty(claimValue) || !int.TryParse(claimValue, out var userId))
            {
                throw new UserNotAuthenticatedException($"Required claim '{ClaimField.UserId}' is missing or malformed.");
            }

            return userId;
        }

        public string? Username()
        {
            return user.FindFirst(ClaimField.Username)?.Value;
        }

        public string? MobileNumber()
        {
            return user.FindFirst(ClaimField.MobileNumber)?.Value;
        }

        public string? Claim(string claimType)
        {
            return user.FindFirst(claimType)?.Value;
        }
    }
}