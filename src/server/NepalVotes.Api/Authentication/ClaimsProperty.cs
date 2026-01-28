using System.Security.Claims;
using NepalVotes.Domain.Exceptions;

namespace NepalVotes.Api.Authentication;

public static class ClaimsProperty
{
    extension(ClaimsPrincipal user)
    {
        public int GetUserId()
        {
            var claimValue = user.FindFirst(ClaimField.UserId)?.Value;
    
            if (string.IsNullOrEmpty(claimValue) || !int.TryParse(claimValue, out var userId))
            {
                throw new UserNotAuthenticatedException($"Required claim '{ClaimField.UserId}' is missing or malformed.");
            }

            return userId;
        }

        public string? GetUsername()
        {
            return user.FindFirst(ClaimField.Username)?.Value;
        }

        public string? GetMobileNumber()
        {
            return user.FindFirst(ClaimField.MobileNumber)?.Value;
        }

        public string? GetClaim(string claimType)
        {
            return user.FindFirst(claimType)?.Value;
        }
    }
}