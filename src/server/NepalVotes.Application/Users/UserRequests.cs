namespace NepalVotes.Application.Users;

public class AddUserRequest
{
    public string FirstNameEn { get; set; } = string.Empty;
    public string MiddleNameEn { get; set; } = string.Empty;
    public string LastNameEn { get; set; } = string.Empty;
    public string FirstNameNp { get; set; } = string.Empty;
    public string MiddleNameNp { get; set; } = string.Empty;
    public string LastNameNp { get; set; } = string.Empty;
    public DateOnly DateOfBirth { get; set; }
    public string MobileNumber { get; set; } = string.Empty;
    public string NationalIdNumber { get; set; } = string.Empty;
    public string VoterIdNumber { get; set; } = string.Empty;
    public int WardId { get; set; }
    public List<string> Roles { get; set; } = new();
    public NepalVotes.Domain.Users.UserStatus? Status { get; set; }
    public List<DocumentUploadRequest>? Documents { get; set; }
}

public class DocumentUploadRequest
{
    public NepalVotes.Domain.Users.UserDocumentType DocumentType { get; set; }
    public required byte[] Content { get; set; }
    public required string FileName { get; set; }
    public required string ContentType { get; set; }
    public long FileLength { get; set; }
}

public class RoleDto
{
    public int RoleId { get; set; }
    public string RoleName { get; set; } = string.Empty;
}
