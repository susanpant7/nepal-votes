namespace NepalVotes.Domain.Users;

public class UserOtp
{
    public int UserOtpId { get; set; }
    // PasswordHasher generates a long string that includes version, salt, and hash.
    public string HashedOtpCode { get; set; } = string.Empty; 
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset ExpiryDate { get; set; }
    public bool IsUsed { get; set; }
    public int AttemptCount { get; set; }
    public UserOtpType UserOtpType { get; set; } =  UserOtpType.Login;
    
    public User User { get; set; }
    public int UserId { get; set; }
}