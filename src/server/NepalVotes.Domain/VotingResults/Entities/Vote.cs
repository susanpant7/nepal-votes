using NepalVotes.Domain.Candidates.Entity;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralGeographies.Entities;

namespace NepalVotes.Domain.VotingResults.Entities;

public class Vote : BaseAuditableEntity
{
    public long VoteId { get; set; }
    public string CastFrom { get; set; }

    public int CandidateId { get; set; }
    public Candidate Candidate { get; set; }

    public int ConstituencyId { get; set; }
    public Constituency Constituency { get; set; }
}