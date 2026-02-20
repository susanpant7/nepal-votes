using NepalVotes.Application.ElectoralConstituencies;
using NepalVotes.Domain.UserRegistrations;
using NepalVotes.Domain.Users;

namespace NepalVotes.Application.UserRegistrations;

public class UserRegistrationListItem
{
    public int UserRegistrationId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string MobileNumber { get; set; } = string.Empty;
    public string NationalIdNumber { get; set; } = string.Empty;
    public string VoterIdNumber { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTimeOffset RequestDate { get; set; }
}

public class UserRegistrationReviewDetail
{
    public string FirstName { get; set; } = string.Empty;
    public string? MiddleName { get; set; }
    public string LastName { get; set; } = string.Empty;
    public string FirstNameNp { get; set; } = string.Empty;
    public string? MiddleNameNp { get; set; }
    public string LastNameNp { get; set; } = string.Empty;
    public DateOnly Dob { get; set; }
    public string MobileNumber { get; set; } = string.Empty;
    public string NationalIdNumber { get; set; } = string.Empty;
    public string VoterIdNumber { get; set; } = string.Empty;
    public string ReviewComment { get; set; } = string.Empty;
    public string WardFullAddress { get; set; } = string.Empty;
    public List<DocumentReviewDetail> Documents { get; set; } = [];
}

public class DocumentReviewDetail
{
    public int DocumentType { get; set; }
    public byte[] Content { get; set; } = [];
    public string ContentType { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
}

public static class UserRegistrationMapper
{
    public static UserRegistrationListItem ToListItem(this UserRegistration userRegistration)
    {
        return new UserRegistrationListItem
        {
            UserRegistrationId = userRegistration.UserRegistrationId,
            FullName = $"{userRegistration.FirstNameEn} {userRegistration.MiddleNameEn} {userRegistration.LastNameEn}".Replace("  ", " ").Trim(),
            MobileNumber = userRegistration.MobileNumber,
            Status = userRegistration.Status.ToString(),
            RequestDate = userRegistration.RequestDate,
            NationalIdNumber = userRegistration.NationalIdNumber,
            VoterIdNumber = userRegistration.VoterIdNumber,
        };
    }
    
    public static UserRegistrationReviewDetail ToReviewDetails(this UserRegistration registration)
    {
        var ward = registration.Ward;
        var wardName = registration.Ward?.WardNumber.ToString() ?? "N/A";
        var municipalityName = registration.Ward?.Municipality?.MunicipalityNameEn ?? "N/A";
        var districtName = registration.Ward?.Municipality?.District?.DistrictNameEn ?? "N/A";
        var provinceName = registration.Ward?.Municipality?.District?.Province?.ProvinceNameEn ?? "N/A";
        
        return new UserRegistrationReviewDetail
        {
            FirstName = registration.FirstNameEn,
            MiddleName = registration.MiddleNameEn,
            LastName = registration.LastNameEn,
            FirstNameNp = registration.FirstNameNp,
            MiddleNameNp = registration.MiddleNameNp,
            LastNameNp = registration.LastNameNp,
            Dob = registration.DateOfBirth,
            MobileNumber = registration.MobileNumber,
            NationalIdNumber = registration.NationalIdNumber,
            VoterIdNumber = registration.VoterIdNumber,
            ReviewComment = registration.ReviewComment,
            WardFullAddress = $"{provinceName} > {districtName} > {municipalityName} > Ward {wardName}",
            Documents = (registration.UserRegistrationDocuments ?? new List<UserRegistrationDocument>()).Select(d => new DocumentReviewDetail
            {
                DocumentType = (int)d.DocumentType,
                Content = d.Content,
                ContentType = d.ContentType,
                FileName = d.FileName
            }).ToList()
        };
    }

}