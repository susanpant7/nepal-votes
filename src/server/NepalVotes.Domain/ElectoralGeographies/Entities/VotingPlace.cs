using NepalVotes.Domain.Common;

namespace NepalVotes.Domain.ElectoralGeographies.Entities;

public class VotingPlace : BaseAuditableEntity
{
    public int VotingPlaceId { get; set; }
    public string VotingPlaceName { get; set; }
    public string VotingPlaceAddress { get; set; }

    public int WardId { get; set; }
    public Ward Ward { get; set; }
}