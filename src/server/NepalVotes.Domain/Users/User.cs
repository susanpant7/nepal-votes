using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Domain.Users;

public class User : BaseAuditableEntity
{
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string MiddleName { get; set; }
    public string LastName { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public int Age { get; private set; }
    public string MobileNumber { get; set; }
    public string NationalIdNumber { get; set; }
    public UserStatus Status { get; set; } = UserStatus.Requested;
    public DateTimeOffset RequestDate { get; set; }
    public DateTimeOffset? ApprovedDate { get; set; }

    public ICollection<Role> Roles { get; set; }
    
    public ICollection<UserDocument> UserDocuments { get; set; }
    
    public ICollection<UserOtp> UserOtps { get; set; }

    public int VotingPlaceId { get; set; }
    public VotingPlace VotingPlace { get; set; }
    
    public int? ApprovedByUserId { get; set; }
    public User? ApprovedByUser { get; set; }
    
    public int UserRefreshTokenId { get; set; }
    public UserRefreshToken UserRefreshToken { get; set; }
    
    // computed column
    public string FullName { get; private set; } = null!;
}