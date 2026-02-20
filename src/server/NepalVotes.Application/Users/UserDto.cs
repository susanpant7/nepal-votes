namespace NepalVotes.Application.Users;

public class UserDto
{
    public int UserId { get; set; }
    public string FirstNameEn { get; set; } = string.Empty;
    public string MiddleNameEn { get; set; } = string.Empty;
    public string LastNameEn { get; set; } = string.Empty;
    public string FirstNameNp { get; set; } = string.Empty;
    public string MiddleNameNp { get; set; } = string.Empty;
    public string LastNameNp { get; set; } = string.Empty;
    public string FullNameEn { get; set; } = string.Empty;
    public string FullNameNp { get; set; } = string.Empty;
    public string MobileNumber { get; set; } = string.Empty;
    public string NationalIdNumber { get; set; } = string.Empty;
    public string VoterIdNumber { get; set; } = string.Empty;
    public DateOnly DateOfBirth { get; set; }
    public int Age { get; set; }
    
    public int WardId { get; set; }
    public string? WardName { get; set; }
    public int? WardNumber { get; set; }
    public string? MunicipalityName { get; set; }
    public string? DistrictName { get; set; }
    public string? ProvinceName { get; set; }
    
    public List<string> Roles { get; set; } = new();
    public string Status { get; set; } = string.Empty;
    public DateTimeOffset RequestDate { get; set; }
    
    public List<DocumentUploadRequest> Documents { get; set; } = new();
}
