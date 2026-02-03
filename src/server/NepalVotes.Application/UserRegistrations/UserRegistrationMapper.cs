using NepalVotes.Application.ElectoralConstituencies;
using NepalVotes.Domain.UserRegistrations;

namespace NepalVotes.Application.UserRegistrations;

public class UserRegistrationListItem
{
    public int UserRegistrationId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string MobileNumber { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTimeOffset RequestDate { get; set; }
    public string VotingPlaceName { get; set; } = string.Empty;
}

public class UserRegistrationReviewDetail
{
    public string FirstName { get; set; } = string.Empty;
    public string? MiddleName { get; set; }
    public string LastName { get; set; } = string.Empty;
    public DateOnly Dob { get; set; }
    public string MobileNumber { get; set; } = string.Empty;
    public string VotingPlaceFullAddress { get; set; } = string.Empty;
    public string ReviewComment { get; set; } = string.Empty;
    public List<UserRegistrationReviewDocumentDetail> ReviewDocuments { get; set; } = new();
}

public class UserRegistrationReviewDocumentDetail
{
    public string DocumentContent { get; set; } = string.Empty;
    public string DocumentContentType { get; set; } = string.Empty;
    public string DocumentName { get; set; } = string.Empty;
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
            VotingPlaceName = userRegistration.VotingPlace?.VotingPlaceAddress ?? "Unknown"
        };
    }
    
    public static UserRegistrationReviewDetail ToReviewDetails(this UserRegistration registration)
    {
        var votingPlaceAddress = registration.VotingPlace.VotingPlaceAddress;
        var wardName = registration.VotingPlace.Ward.WardNumber;
        var municipalityName = registration.VotingPlace.Ward.Municipality.MunicipalityName;
        var districtName = registration.VotingPlace.Ward.Municipality.District.DistrictName;
        var provinceName = registration.VotingPlace.Ward.Municipality.District.Province.ProvinceName;
        return new UserRegistrationReviewDetail
        {
            FirstName = registration.FirstName,
            MiddleName = registration.MiddleName,
            LastName = registration.LastName,
            Dob = registration.DateOfBirth,
            MobileNumber = registration.MobileNumber,
            ReviewComment = registration.ReviewComment,
            VotingPlaceFullAddress = $"Province: {provinceName} > District: {districtName} > Mun: {municipalityName} > Ward No. {wardName} > {votingPlaceAddress}",
            ReviewDocuments = registration.UserRegistrationDocuments?.Select(doc => new UserRegistrationReviewDocumentDetail
            {
                DocumentContent = Convert.ToBase64String(doc.Content),
                DocumentContentType = doc.ContentType,
                DocumentName = doc.FileName
            }).ToList() ?? new List<UserRegistrationReviewDocumentDetail>()
        };
    }

}