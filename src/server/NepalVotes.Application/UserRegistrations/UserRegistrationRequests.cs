using System.ComponentModel.DataAnnotations;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.UserRegistrations;

public class RegisterUserRequest
{
    public required string FirstName { get; set; }

    public string? MiddleName { get; set; } 

    public required string LastName { get; set; }
    
    public DateOnly DateOfBirth { get; set; }

    public required string MobileNumber { get; set; }
    public required string NationalIdNumber { get; set; }

    public int VotingPlaceId { get; set; }

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