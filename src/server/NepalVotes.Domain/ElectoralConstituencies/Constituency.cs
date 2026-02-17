using NepalVotes.Domain.Candidates;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Domain.ElectoralConstituencies;

public class Constituency : BaseAuditableEntity
{
    public int ConstituencyId { get; set; }
    public string ConstituencyNameEn { get; set; }
    public string ConstituencyNameNp { get; set; }

    public ICollection<Ward> Wards { get; set; }
    public ICollection<Candidate> Candidates { get; set; }
}