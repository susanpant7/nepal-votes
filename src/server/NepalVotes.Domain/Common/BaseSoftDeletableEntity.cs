namespace NepalVotes.Domain.Common;

public abstract class BaseSoftDeletableEntity : BaseAuditableEntity, ISoftDeletable
{
    public DateTimeOffset? DeletedAt { get; set; }
    public int? DeletedBy { get; set; }
}