using System.ComponentModel.DataAnnotations;
using NepalVotes.Domain.Users;

namespace NepalVotes.Api.UserRegistrations;

public class RegisterUserApiRequest
{
    [Required]
    [StringLength(100)]
    public required string FirstNameEn { get; set; }

    [StringLength(100)]
    public string? MiddleNameEn { get; set; } 

    [Required]
    [StringLength(100)]
    public required string LastNameEn { get; set; }

    [Required]
    [StringLength(100)]
    public required string FirstNameNp { get; set; }

    [StringLength(100)]
    public string? MiddleNameNp { get; set; }

    [Required]
    [StringLength(100)]
    public required string LastNameNp { get; set; }
    
    [Required]
    public required DateOnly DateOfBirth { get; set; }

    [Required]
    [RegularExpression(@"^\+?[0-9]{10,15}$", ErrorMessage = "Invalid mobile number")]
    public required string MobileNumber { get; set; }
    
    [Required]
    public required string NationalIdNumber { get; set; }
    
    [Required]
    public required string VoterIdNumber { get; set; }

    [Required]
    public int WardId { get; set; }

    [Required]
    public required List<DocumentUploadApiRequest> Documents { get; set; }
}

public class DocumentUploadApiRequest
{
    [Required]
    public UserDocumentType DocumentType { get; set; }

    [Required]
    public required IFormFile File { get; set; }
}

public class VerifyOtpApiRequest
{
    [Required]
    public int UserRegistrationId { get; set; }

    [Required]
    [StringLength(6)]
    public required string Otp { get; set; }
}