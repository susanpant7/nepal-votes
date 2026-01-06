using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralGeographies.Entities;
using NepalVotes.Domain.Users.Enums;

namespace NepalVotes.Domain.Users.Entities;

public class User : BaseAuditableEntity
{
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string MiddleName { get; set; }
    public string LastName { get; set; }
    public string MobileNumber { get; set; }
    public UserStatus Status { get; set; } = UserStatus.Requested;
    public DateTime RequestDate { get; set; }
    public DateTime? ApprovedDate { get; set; }

    public ICollection<Role> Roles { get; set; }
    
    public ICollection<UserDocument> UserDocuments { get; set; }

    public int VotingPlaceId { get; set; }
    public VotingPlace VotingPlace { get; set; }
    
    public int? ApprovedByUserId { get; set; }
    public User? ApprovedByUser { get; set; }
}