using System.ComponentModel.DataAnnotations;

namespace NepalVotes.Application.Authentication;

public record OtpRequest(
    [Required]
    [Phone] 
    string MobileNumber,
    string? ProvidedOtp
);