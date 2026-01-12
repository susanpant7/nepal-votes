namespace NepalVotes.Application.Authentication;

public interface IOtpHashingService
{
    public string HashOtp(string otp);
    public bool VerifyOtp(string hashedOtp, string providedOtp);
}