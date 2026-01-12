using System.ComponentModel.DataAnnotations;

namespace NepalVotes.Application.Authentication;

public record GenerateOtpRequest(
    [Required]
    [Phone] 
    string MobileNumber,
    string? ProvidedOtp
);

public record VerifyOtpRequest(
    [Required]
    [Phone] 
    string MobileNumber,
    [Required]
    string ProvidedOtp
);