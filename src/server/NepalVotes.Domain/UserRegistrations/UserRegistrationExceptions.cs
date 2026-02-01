namespace NepalVotes.Domain.UserRegistrations;

public class RegistrationAlreadyPendingException()
    : Exception("Your registration request is already pending admin approval. Please wait.");
    
public class InvalidOtpException(int remainingAttempts)
    : Exception($"Invalid OTP. Remaining attempts: {remainingAttempts}")
{
    public int RemainingAttempts { get; } = remainingAttempts;
}

public class OtpExpiredException() : Exception("OTP has expired. Please register again.");

public class OtpAttemptsExceededException() : Exception("Maximum OTP attempts exceeded. Please register again.");

public class OtpRateLimitException(int seconds) : Exception($"Please wait {seconds} seconds before requesting a new code.");