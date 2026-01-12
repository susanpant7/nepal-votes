namespace NepalVotes.Domain.Users;

public interface IUserOtpRepository
{
    Task AddOtpAsync(UserOtp otp);
    Task<UserOtp?> GetLatestActiveOtpAsync(int userId, UserOtpType type);
    Task InvalidateExistingOtpsAsync(int userId, UserOtpType type);
}