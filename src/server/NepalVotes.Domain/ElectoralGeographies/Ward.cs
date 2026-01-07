using NepalVotes.Domain.Common;

namespace NepalVotes.Domain.ElectoralGeographies;

public class Ward : BaseAuditableEntity
{
    public int WardId { get; set; }
    public string WardName { get; set; }
    public int WardNumber { get; set; }

    public int MunicipalityId { get; set; }
    public Municipality Municipality { get; set; }

    public int ConstituencyId { get; set; }
    public Constituency Constituency { get; set; }

    public ICollection<VotingPlace> VotingPlaces { get; set; } = new List<VotingPlace>();
}