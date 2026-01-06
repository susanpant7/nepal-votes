using NepalVotes.Domain.Common;
using NepalVotes.Domain.MediaFiles.Entities;
using NepalVotes.Domain.Users.Enums;

namespace NepalVotes.Domain.Users.Entities;

public class UserDocument : BaseAuditableEntity
{
    public int UserDocumentId { get; set; }
    public UserDocumentType DocumentType { get; set; }
    public string ReviewComment { get; set; }
    
    public int MediaFileId { get; set; }
    public MediaFile MediaFile { get; set; }
    
    public int UserId { get; set; }
    public User User { get; set; }
}