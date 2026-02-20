using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Domain.Users;

public class User : BaseAuditableEntity
{
    public int UserId { get; set; }
    public string FirstNameEn { get; set; }
    public string MiddleNameEn { get; set; }
    public string LastNameEn { get; set; }
    public string FirstNameNp { get; set; }
    public string MiddleNameNp { get; set; }
    public string LastNameNp { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public int Age { get; private set; }
    public string MobileNumber { get; set; }
    public string NationalIdNumber { get; set; }
    public string VoterIdNumber { get; set; }
    public UserStatus Status { get; set; } = UserStatus.Requested;
    public DateTimeOffset RequestDate { get; set; }
    public DateTimeOffset? ApprovedDate { get; set; }

    public ICollection<Role> Roles { get; set; } = new List<Role>();
    
    public ICollection<UserDocument> UserDocuments { get; set; } = new List<UserDocument>();
    
    public ICollection<UserOtp> UserOtps { get; set; } = new List<UserOtp>();

    public int WardId { get; set; }
    public Ward Ward { get; set; }
    
    public int? ApprovedByUserId { get; set; }
    public User? ApprovedByUser { get; set; }
    
    public int? UserRefreshTokenId { get; set; }
    public UserRefreshToken? UserRefreshToken { get; set; }
    
    // computed column
    public string FullNameEn { get; private set; } = null!;
    public string FullNameNp { get; private set; } = null!;
}