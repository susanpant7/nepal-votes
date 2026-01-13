using NepalVotes.Domain.Users;

namespace NepalVotes.Application.Users;

public class UserProfile
{
    public int UserId { get; set; }
    public string FullName { get; set; }
    public string MobileNumber { get; set; }
    public string VotingPlaceAddress { get; set; }
}

public static class UserMapper
{
    public static UserProfile ToUserProfile(this User user)
    {
        return new UserProfile
        {
            UserId = user.UserId,
            FullName = $"{user.FirstName} {user.MiddleName} {user.LastName}".Replace("  ", " ").Trim(),
            MobileNumber = user.MobileNumber,
            VotingPlaceAddress = user.VotingPlace.VotingPlaceAddress
        };
    }
}