namespace NepalVotes.Domain.Common;
public interface IAuditableEntity
{
    DateTimeOffset CreatedAt { get; set; }
    int? CreatedBy { get; set; }
    DateTimeOffset? UpdatedAt { get; set; }
    int? UpdatedBy { get; set; }
}