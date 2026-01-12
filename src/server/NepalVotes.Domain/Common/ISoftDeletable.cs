namespace NepalVotes.Domain.Common;

public interface ISoftDeletable
{
    DateTimeOffset? DeletedAt { get; set; }
    int? DeletedBy { get; set; }
}