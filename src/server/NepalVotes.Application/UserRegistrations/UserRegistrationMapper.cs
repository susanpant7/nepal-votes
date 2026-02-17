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
    public DateOnly Dob { get; set; }
    public string MobileNumber { get; set; } = string.Empty;
    public string NationalIdNumber { get; set; } = string.Empty;
    public string VoterIdNumber { get; set; } = string.Empty;
    public string ReviewComment { get; set; } = string.Empty;
    public byte[] NationalIdDocumentContent { get; set; } = [];
    public string NationalIdDocumentContentType { get; set; } = string.Empty;
    public string NationalIdDocumentName { get; set; } = string.Empty;
}

public static class UserRegistrationMapper
{
    public static UserRegistrationListItem ToListItem(this UserRegistration userRegistration)
    {
        return new UserRegistrationListItem
        {
            UserRegistrationId = userRegistration.UserRegistrationId,
            FullName = $"{userRegistration.FirstName} {userRegistration.MiddleName} {userRegistration.LastName}".Replace("  ", " ").Trim(),
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
        var wardName = registration.Ward.WardNumber;
        var municipalityName = registration.Ward.Municipality.MunicipalityNameEn;
        var districtName = registration.Ward.Municipality.District.DistrictNameEn;
        var provinceName = registration.Ward.Municipality.District.Province.ProvinceNameEn;
        var doc =
            registration.UserRegistrationDocuments.FirstOrDefault(x => x.DocumentType == UserDocumentType.NationalIdentity)!;
        return new UserRegistrationReviewDetail
        {
            FirstName = registration.FirstName,
            MiddleName = registration.MiddleName,
            LastName = registration.LastName,
            Dob = registration.DateOfBirth,
            MobileNumber = registration.MobileNumber,
            NationalIdNumber = registration.NationalIdNumber,
            VoterIdNumber = registration.VoterIdNumber,
            ReviewComment = registration.ReviewComment,
            NationalIdDocumentContent = doc.Content,
            NationalIdDocumentContentType =  doc.ContentType,
            NationalIdDocumentName = doc.FileName
        };
    }

}