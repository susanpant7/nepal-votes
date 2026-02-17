using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Users;

public class UserProfile
{
    public string FullName { get; set; }
    public string MobileNumber { get; set; }
    public string VotingPlaceAddress { get; set; }
    public string ConstituencyName { get; set; }
}

public class UserDropdown
{
    public string FullName { get; set; }
    public int UserId { get; set; }
}

public static class UserMapper
{
    public static UserProfile ToUserProfile(this User user)
    {
        return new UserProfile
        {
            FullName = $"{user.FirstName} {user.MiddleName} {user.LastName}".Replace("  ", " ").Trim(),
            MobileNumber = user.MobileNumber,
            VotingPlaceAddress = $"Voting Place Address For {user.WardId}",
            ConstituencyName = user.Ward?.Constituency?.ConstituencyNameEn ?? "Not Assigned"
        };
    }
    
    public static UserDropdown ToUserDropdown(this User user)
    {
        return new UserDropdown
        {
            FullName = $"{user.FirstName} {user.MiddleName} {user.LastName}".Replace("  ", " ").Trim(),
            UserId = user.UserId
        };
    }
}