using Microsoft.AspNetCore.Http;
using NepalVotes.Domain.Users;

namespace NepalVotes.Api.Users;

public class AddUserApiRequest
{
    public string FirstNameEn { get; set; } = string.Empty;
    public string? MiddleNameEn { get; set; }
    public string LastNameEn { get; set; } = string.Empty;
    public string FirstNameNp { get; set; } = string.Empty;
    public string? MiddleNameNp { get; set; }
    public string LastNameNp { get; set; } = string.Empty;
    public string DateOfBirth { get; set; } = string.Empty; // Receive as string to parse
    public string MobileNumber { get; set; } = string.Empty;
    public string NationalIdNumber { get; set; } = string.Empty;
    public string VoterIdNumber { get; set; } = string.Empty;
    public int WardId { get; set; }
    public List<string> Roles { get; set; } = new();
    public UserStatus? Status { get; set; }
    
    public IFormFile? NationalIdCardFile { get; set; }
    public IFormFile? VoterCardFile { get; set; }
    public IFormFile? PassportFile { get; set; }
}

public class UserSearchRequest
{
    public int? UserId { get; set; }
    public string? MobileNumber { get; set; }
    public string? NationalId { get; set; }
    public string? VoterId { get; set; }
    public int? ProvinceId { get; set; }
    public int? DistrictId { get; set; }
    public int? MunicipalityId { get; set; }
    public string? Role { get; set; }
    public int? RoleId { get; set; }
    public UserStatus? Status { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}
