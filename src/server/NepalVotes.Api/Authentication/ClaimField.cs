using System.Security.Claims;

namespace NepalVotes.Api.Authentication;

public static class ClaimField
{
    // Standard claims
    public const string UserId = ClaimTypes.NameIdentifier;
    public const string Username = ClaimTypes.Name;
    public const string Role = ClaimTypes.Role;

    // Custom claims (add as needed)
    public const string MobileNumber = ClaimTypes.MobilePhone;
    public const string Email = ClaimTypes.Email;
}