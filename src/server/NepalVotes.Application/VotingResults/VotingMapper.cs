using NepalVotes.Domain.Candidates;
using NepalVotes.Domain.PoliticalParties;

namespace NepalVotes.Application.VotingResults;

public class VoterCandidateSelectOptions
{
    public int CandidateId { get; set; }
    public string CandidateName { get; set; } = null!;
    public byte[] SymbolContent { get; set; }
    public string SymbolContentType { get; set; } = null!;
    public string SymbolFileName { get; set; } = null!;
    
    public byte[]? CandidateImageContent { get; set; }
    public string? CandidateImageContentType { get; set; }
    public string? CandidateImageFileName { get; set; }
    
    public int CandidateImageId { get; set; }
}

public class VoterPartySelectOptions
{
    public int PartyId { get; set; }
    public string PartyName { get; set; } = null!;
    public byte[] SymbolContent { get; set; }
    public string SymbolContentType { get; set; } = null!;
    public string SymbolFileName { get; set; } = null!;
}

public static class VotingMapper
{
    public static VoterCandidateSelectOptions ToVoterCandidateOptions(this Candidate candidate)
    {
        var symbolMedia = candidate.IsIndependent 
            ? candidate.CandidateSymbol?.CandidateSymbolMediaFile 
            : candidate.PoliticalParty?.SymbolMediaFile;

        return new VoterCandidateSelectOptions
        {
            CandidateId = candidate.CandidateId,
            CandidateName = candidate.User.FullNameEn,
            SymbolContent = symbolMedia?.Content ?? [],
            SymbolContentType = symbolMedia?.ContentType ?? string.Empty,
            SymbolFileName = symbolMedia?.FileName ?? string.Empty,
            CandidateImageContent = candidate.CandidateImageMediaFile?.Content,
            CandidateImageContentType = candidate.CandidateImageMediaFile?.ContentType,
            CandidateImageFileName = candidate.CandidateImageMediaFile?.FileName,
            CandidateImageId = candidate.CandidateImageId
        };
    }

    public static VoterPartySelectOptions ToVoterPartyOptions(this PoliticalParty party)
    {
        return new VoterPartySelectOptions
        {
            PartyId = party.PoliticalPartyId,
            PartyName = party.PoliticalPartyNameEn,
            SymbolContent = party.SymbolMediaFile.Content,
            SymbolContentType = party.SymbolMediaFile?.ContentType ?? string.Empty,
            SymbolFileName = party.SymbolMediaFile?.FileName ?? string.Empty
        };
    }
}