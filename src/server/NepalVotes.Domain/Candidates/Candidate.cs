using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralConstituencies;
using NepalVotes.Domain.PoliticalParties;
using NepalVotes.Domain.MediaFiles;
using NepalVotes.Domain.Users;

namespace NepalVotes.Domain.Candidates;

public class Candidate : BaseAuditableEntity
{
    public int CandidateId { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    
    public int? PoliticalPartyId { get; set; }
    public PoliticalParty? PoliticalParty { get; set; }

    public bool IsIndependent { get; set; }
    
    public int ConstituencyId { get; set; }
    public Constituency Constituency { get; set; } = null!;
    
    //the CandidateId in the candidate json file -- to get the image
    public int CandidateImageId { get; set; }

    public int? CandidateImageMediaFileId { get; set; }
    public MediaFile? CandidateImageMediaFile { get; set; }
    
    // if independent, should have own symbol
    public int? CandidateSymbolId { get; set; }
    public CandidateSymbol? CandidateSymbol { get; set; }
}