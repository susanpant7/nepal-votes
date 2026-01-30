using NepalVotes.Domain.Candidates;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralConstituencies;
using NepalVotes.Domain.PoliticalParties;

namespace NepalVotes.Domain.VotingResults;

public class Vote : BaseAuditableEntity
{
    public long VoteId { get; set; }
    public string VotedFromLocation { get; set; }

    public int? CandidateId { get; set; }
    public Candidate? Candidate { get; set; }
    
    public int? PoliticalPartyId { get; set; }
    public PoliticalParty? PoliticalParty { get; set; }
    
    public int ConstituencyId { get; set; }
    public Constituency Constituency { get; set; }
}