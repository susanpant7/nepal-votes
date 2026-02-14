using NepalVotes.Domain.Candidates;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.MediaFiles;
using NepalVotes.Domain.Users;

namespace NepalVotes.Domain.PoliticalParties;

public class PoliticalParty : BaseAuditableEntity
{
    public int PoliticalPartyId { get; set; }

    public string PoliticalPartyName { get; set; } = null!;
    
    public int? PartyLeaderId { get; set; }
    public User? PartyLeader { get; set; }

    // party symbol
    public int SymbolMediaFileId { get; set; }
    public MediaFile SymbolMediaFile { get; set; }
    
    public ICollection<Candidate> Candidates { get; set; } = new List<Candidate>();
}