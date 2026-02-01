namespace NepalVotes.Application.UserRegistrations;

public class RegisterUserResponse
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public int UserRegistrationId { get; set; }   // needed to verify OTP later
}

public class VerifyOtpResponse
{
    public bool Success { get; set; }
    public string Message { get; set; }
}