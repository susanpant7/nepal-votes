namespace NepalVotes.Application.Users;

public interface IOtpHashingService
{
    public string HashOtp(string otp);
    public bool VerifyOtp(string hashedOtp, string providedOtp);
}