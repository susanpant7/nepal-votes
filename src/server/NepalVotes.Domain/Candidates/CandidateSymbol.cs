using NepalVotes.Domain.Common;
using NepalVotes.Domain.MediaFiles;

namespace NepalVotes.Domain.Candidates;

public class CandidateSymbol : BaseAuditableEntity
{
    public int CandidateSymbolId { get; set; }
    
    public string CandidateSymbolNameEn { get; set; } 
    public string CandidateSymbolNameNp { get; set; }
    
    public int CandidateSymbolMediaFileId { get; set; }
    public MediaFile CandidateSymbolMediaFile { get; set; }

    public ICollection<Candidate> Candidates { get; set; } = new List<Candidate>();
}