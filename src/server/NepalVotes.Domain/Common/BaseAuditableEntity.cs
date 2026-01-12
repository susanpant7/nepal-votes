namespace NepalVotes.Domain.Common;

public abstract class BaseAuditableEntity : IAuditableEntity
{
    public DateTimeOffset CreatedAt { get; set; }
    public int? CreatedBy { get; set; }

    public DateTimeOffset? UpdatedAt { get; set; }
    public int? UpdatedBy { get; set; }
}