namespace NepalVotes.Domain.Users;

public interface IUserOtpRepository
{
    Task AddOtpAsync(UserOtp otp);
    Task UpdateOtpAsync(UserOtp otp);
    Task InvalidateExistingOtpsAsync(string mobile, UserOtpType type);
    Task<UserOtp?> GetLatestOtpAsync(string mobile, UserOtpType type);
    Task<UserOtp?> GetLatestActiveOtpAsync(string mobile, UserOtpType type);
    Task<int> GetCountAsync(string mobile, UserOtpType type, DateTimeOffset since);
    Task<int> GetCountByIpAsync(string ipAddress, DateTimeOffset since);
}