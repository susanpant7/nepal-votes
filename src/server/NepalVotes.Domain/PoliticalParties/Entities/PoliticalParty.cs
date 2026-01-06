using NepalVotes.Domain.Candidates.Entity;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.MediaFiles.Entities;

namespace NepalVotes.Domain.PoliticalParties.Entities;

public class PoliticalParty : BaseAuditableEntity
{
    public int PoliticalPartyId { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; }

    public string LeaderName { get; set; }

    // party symbol
    public int MediaFileId { get; set; }
    public MediaFile MediaFile { get; set; }
    
    public ICollection<Candidate> Candidates { get; set; } = new List<Candidate>();
}