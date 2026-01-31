using NepalVotes.Domain.Common;
using NepalVotes.Domain.MediaFiles;

namespace NepalVotes.Domain.Users;

public class UserDocument : BaseAuditableEntity
{
    public int UserDocumentId { get; set; }
    public UserDocumentType DocumentType { get; set; }
    
    public int UserDocumentMediaFileId { get; set; }
    public MediaFile UserDocumentMediaFile { get; set; }
    
    public int UserId { get; set; }
    public User User { get; set; }
}