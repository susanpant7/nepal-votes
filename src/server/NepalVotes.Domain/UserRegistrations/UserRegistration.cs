using NepalVotes.Domain.ElectoralGeographies;
using NepalVotes.Domain.Users;

namespace NepalVotes.Domain.UserRegistrations;

public class UserRegistration
{
    public int UserRegistrationId { get; set; }
    public string FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string LastName { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public string MobileNumber { get; set; }
    public string NationalIdNumber { get; set; }
    public UserStatus Status { get; set; } = UserStatus.OtpPending;
    public DateTimeOffset RequestDate { get; set; }
    public string ReviewComment { get; set; }

    public ICollection<UserRegistrationDocument> UserRegistrationDocuments { get; set; }
    
    // otp code fields
    public string HashedOtpCode { get; set; } = string.Empty; 
    public DateTimeOffset OtpCreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset OtpExpiryDate { get; set; }
    public bool IsOtpUsed { get; set; }
    public int AttemptCount { get; set; }

    public int VotingPlaceId { get; set; }
    public VotingPlace VotingPlace { get; set; }
}