using NepalVotes.Application.ElectoralConstituencies;
using NepalVotes.Domain.UserRegistrations;

namespace NepalVotes.Application.UserRegistrations;

public class UserRegistrationListItem
{
    public int UserRegistrationId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string MobileNumber { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTimeOffset RequestDate { get; set; }
    public string VotingPlaceName { get; set; } = string.Empty;
}

public static class UserRegistrationMapper
{
    public static UserRegistrationListItem ToListItem(this UserRegistration userRegistration)
    {
        return new UserRegistrationListItem
        {
            UserRegistrationId = userRegistration.UserRegistrationId,
            FullName = $"{userRegistration.FirstName} {userRegistration.MiddleName} {userRegistration.LastName}".Replace("  ", " ").Trim(),
            MobileNumber = userRegistration.MobileNumber,
            Status = userRegistration.Status.ToString(),
            RequestDate = userRegistration.RequestDate,
            VotingPlaceName = userRegistration.VotingPlace?.VotingPlaceAddress ?? "Unknown"
        };
    }

}