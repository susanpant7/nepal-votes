using Microsoft.AspNetCore.Identity;
using NepalVotes.Application.Authentication;
using NepalVotes.Application.Users;

namespace NepalVotes.Infrastructure.Hashers;

public class OtpHashingService : IOtpHashingService
{
    private readonly PasswordHasher<string> _hasher = new();

    public string HashOtp(string password)
    {
        return _hasher.HashPassword("user", password);
    }

    public bool VerifyOtp(string hashedOtp, string providedOtp)
    {
        var result = _hasher.VerifyHashedPassword("user", hashedOtp, providedOtp);
        return result != PasswordVerificationResult.Failed;
    }
}