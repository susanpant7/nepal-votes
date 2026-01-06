using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralGeographies.Entities;
using NepalVotes.Domain.MediaFiles.Entities;
using NepalVotes.Domain.PoliticalParties.Entities;
using NepalVotes.Domain.Users.Entities;

namespace NepalVotes.Domain.Candidates.Entity;

public class Candidate : BaseAuditableEntity
{
    public int CandidateId { get; set; }
    
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    
    public int? PoliticalPartyId { get; set; }
    public PoliticalParty? PoliticalParty { get; set; }

    public bool IsIndependent { get; set; } = false;

    public int ConstituencyId { get; set; }
    public Constituency Constituency { get; set; } = null!;
    
    // if independent, should have own symbol
    public int? MediaFileId { get; set; }
    public MediaFile? MediaFile { get; set; }
}