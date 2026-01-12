using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralGeographies;
using NepalVotes.Domain.MediaFiles;
using NepalVotes.Domain.PoliticalParties;
using NepalVotes.Domain.Users;

namespace NepalVotes.Domain.Candidates;

public class Candidate : BaseAuditableEntity
{
    public int CandidateId { get; set; }
    public DateTimeOffset CreationDate { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    
    public int? PoliticalPartyId { get; set; }
    public PoliticalParty? PoliticalParty { get; set; }

    public bool IsIndependent { get; set; }
    
    public int ConstituencyId { get; set; }
    public Constituency Constituency { get; set; } = null!;
    
    // if independent, should have own symbol
    public int? CandidateSymbolMediaFileId { get; set; }
    public MediaFile? CandidateSymbolMediaFile { get; set; }
}