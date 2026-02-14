using NepalVotes.Domain.Candidates;

namespace NepalVotes.Application.Candidates;

public class CandidateListItem
{
    public int CandidateId { get; set; }
    public string FullName { get; set; } = null!;
    public int ConstituencyId { get; set; }
    public string ConstituencyName { get; set; } = null!;
    public bool IsIndependent { get; set; }
    public string? PoliticalPartyName { get; set; }
    public byte[]? SymbolContent { get; set; }
    public string? SymbolContentType { get; set; }
    public string? SymbolFileName { get; set; }
}

public class CandidateDetail
{
    public int CandidateId { get; set; }
    public string FullName { get; set; } = null!;
    public int ConstituencyId { get; set; }
    public string ConstituencyName { get; set; } = null!;
    public bool IsIndependent { get; set; }
    public int? PoliticalPartyId { get; set; }
    public string? PoliticalPartyName { get; set; }
    public int? CandidateSymbolId { get; set; }
    public byte[]? SymbolContent { get; set; }
    public string? SymbolContentType { get; set; }
    public string? SymbolFileName { get; set; }

}

public static class CandidateMapper
{
    public static CandidateListItem ToCandidateListItem(this Candidate candidate)
    {
        // Determine if we use the Candidate's symbol (independent) or the Party's symbol
        var symbolMedia = candidate.IsIndependent 
            ? candidate.CandidateSymbol?.CandidateSymbolMediaFile 
            : candidate.PoliticalParty?.SymbolMediaFile;

        return new CandidateListItem
        {
            CandidateId = candidate.CandidateId,
            FullName = $"{candidate.User.FirstName} {candidate.User.LastName}",
            ConstituencyId = candidate.ConstituencyId,
            ConstituencyName = candidate.Constituency.ConstituencyName,
            IsIndependent = candidate.IsIndependent,
            PoliticalPartyName = candidate.IsIndependent ? "Independent" : candidate.PoliticalParty?.PoliticalPartyNameEn,
            SymbolContent = symbolMedia?.Content,
            SymbolContentType = symbolMedia?.ContentType,
            SymbolFileName = symbolMedia?.FileName
        };
    }
    
    public static CandidateDetail ToCandidateDetail(this Candidate candidate)
    {
        // Determine if we use the Candidate's symbol (independent) or the Party's symbol
        var symbolMedia = candidate.IsIndependent 
            ? candidate.CandidateSymbol?.CandidateSymbolMediaFile  
            : candidate.PoliticalParty?.SymbolMediaFile;

        return new CandidateDetail
        {
            CandidateId = candidate.CandidateId,
            FullName = $"{candidate.User.FirstName} {candidate.User.LastName}",
            ConstituencyId = candidate.ConstituencyId,
            ConstituencyName = candidate.Constituency.ConstituencyName,
            IsIndependent = candidate.IsIndependent,
            PoliticalPartyName = candidate.IsIndependent ? "Independent" : candidate.PoliticalParty?.PoliticalPartyNameEn,
            PoliticalPartyId = candidate.PoliticalParty?.PoliticalPartyId,
            CandidateSymbolId =  candidate.CandidateSymbol?.CandidateSymbolId,
            SymbolContent = symbolMedia?.Content,
            SymbolContentType = symbolMedia?.ContentType,
            SymbolFileName = symbolMedia?.FileName
        };
    }
}