using System.ComponentModel.DataAnnotations;

namespace NepalVotes.Application.Users;

public record OtpRequest(
    [Required]
    [Phone] 
    string MobileNumber,
    string? ProvidedOtp
);