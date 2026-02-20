using System.ComponentModel.DataAnnotations;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.UserRegistrations;

public class RegisterUserRequest
{
    public required string FirstNameEn { get; set; }

    public string? MiddleNameEn { get; set; } 

    public required string LastNameEn { get; set; }
    public required string FirstNameNp { get; set; }
    public string? MiddleNameNp { get; set; }
    public required string LastNameNp { get; set; }
    
    public DateOnly DateOfBirth { get; set; }

    public required string MobileNumber { get; set; }
    
    public string? NationalIdNumber { get; set; }
    
    public string? VoterIdNumber { get; set; }

    public int WardId { get; set; }

    public required List<DocumentUploadRequest> Documents { get; set; }
}

public class DocumentUploadRequest
{
    public UserDocumentType DocumentType { get; set; }

    public required byte[] Content { get; set; }
    public required string FileName { get; set; }
    public required string ContentType { get; set; }
    public long FileLength { get; set; }
}

public class VerifyOtpRequest
{
    [Required]
    [Phone]
    public string MobileNumber { get; set; }

    public required string ProvidedOtp { get; set; }
}

public class GenerateOtpRequest
{
    [Required]
    [Phone]
    public string MobileNumber { get; set; }
}

public record UserRegistrationReviewRequest(
    int UserRegistrationId, 
    string? ReviewComment
);

public record SearchUserRegistrationsRequest(
    int? DistrictId,
    string? FullName,
    string? NationalIdNumber,
    string? VoterIdNumber,
    string? MobileNumber,
    int PageNumber = 1,
    int PageSize = 10
);