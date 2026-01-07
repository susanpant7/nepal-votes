using NepalVotes.Domain.Common;

namespace NepalVotes.Domain.MediaFiles;

public class MediaFile : BaseAuditableEntity
{
    public int MediaFileId { get; set; }

    public byte[] Content { get; set; }

    public string ContentType { get; set; } 
    // image/png, image/jpeg, application/pdf, etc.

    public string FileName { get; set; }

    public long Size { get; set; }

}