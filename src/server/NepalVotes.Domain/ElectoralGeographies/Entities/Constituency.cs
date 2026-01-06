using NepalVotes.Domain.Candidates.Entity;
using NepalVotes.Domain.Common;

namespace NepalVotes.Domain.ElectoralGeographies.Entities;

public class Constituency : BaseAuditableEntity
{
    public int ConstituencyId { get; set; }
    public string ConstituencyName { get; set; }

    public ICollection<Ward> Wards { get; set; }
    public ICollection<Candidate> Candidates { get; set; }
}