using NepalVotes.Domain.Candidates;

namespace NepalVotes.Application.Candidates;

public class CandidateListItem
{
    public int CandidateId { get; set; }
    public int CandidateImageId { get; set; }
    public string FullName { get; set; } = null!;
    public int ConstituencyId { get; set; }
    public string ConstituencyName { get; set; } = null!;
    public bool IsIndependent { get; set; }
    public string? PoliticalPartyName { get; set; }
    public byte[]? SymbolContent { get; set; }
    public string? SymbolContentType { get; set; }
    public string? SymbolFileName { get; set; }
    public string? SymbolName { get; set; }
    public byte[]? ImageContent { get; set; }
    public string? ImageContentType { get; set; }
}

public class CandidateDetail
{
    public int CandidateId { get; set; }
    public int CandidateImageId { get; set; }
    public string FullName { get; set; } = null!;
    public int ConstituencyId { get; set; }
    public string ConstituencyName { get; set; } = null!;
    public bool IsIndependent { get; set; }
    public int? PoliticalPartyId { get; set; }
    public string? PoliticalPartyName { get; set; }
    public int? CandidateSymbolId { get; set; }
    public byte[]? SymbolContent { get; set; }
    public string? SymbolContentType { get; set; }
    public string? CandidateSymbolFileName { get; set; }
    public string? SymbolName { get; set; }
    public byte[]? ImageContent { get; set; }
    public string? ImageContentType { get; set; }
}

public static class CandidateMapper
{
    /// <param name="independentSymbol">
    /// Fallback (content, contentType) for independent candidates that have no assigned
    /// CandidateSymbol with actual content. Pass the "Independent" party symbol here.
    /// </param>
    public static CandidateListItem ToCandidateListItem(
        this Candidate candidate,
        (byte[]? Content, string? ContentType)? independentSymbol = null)
    {
        byte[]? symbolContent;
        string? symbolContentType;
        string? symbolFileName;

        if (candidate.IsIndependent)
        {
            var ownMedia = candidate.CandidateSymbol?.CandidateSymbolMediaFile;
            if (ownMedia?.Content != null)
            {
                // Independent candidate has their own custom symbol with content
                symbolContent = ownMedia.Content;
                symbolContentType = ownMedia.ContentType;
                symbolFileName = ownMedia.FileName;
            }
            else
            {
                // Fall back to the "Independent" party symbol
                symbolContent = independentSymbol?.Content;
                symbolContentType = independentSymbol?.ContentType;
                symbolFileName = null;
            }
        }
        else
        {
            var partyMedia = candidate.PoliticalParty?.SymbolMediaFile;
            symbolContent = partyMedia?.Content;
            symbolContentType = partyMedia?.ContentType;
            symbolFileName = partyMedia?.FileName;
        }

        return new CandidateListItem
        {
            CandidateId = candidate.CandidateId,
            CandidateImageId = candidate.CandidateImageId,
            FullName = $"{candidate.User.FirstNameEn} {candidate.User.LastNameEn}",
            ConstituencyId = candidate.ConstituencyId,
            ConstituencyName = candidate.Constituency.ConstituencyNameEn,
            IsIndependent = candidate.IsIndependent,
            PoliticalPartyName = candidate.IsIndependent ? "Independent" : candidate.PoliticalParty?.PoliticalPartyNameEn,
            SymbolContent = symbolContent,
            SymbolContentType = symbolContentType,
            SymbolFileName = symbolFileName,
            SymbolName = candidate.IsIndependent ? candidate.CandidateSymbol?.CandidateSymbolNameEn : null,
            ImageContent = candidate.CandidateImageMediaFile?.Content,
            ImageContentType = candidate.CandidateImageMediaFile?.ContentType
        };
    }

    /// <param name="independentSymbol">
    /// Fallback (content, contentType) for independent candidates that have no assigned
    /// CandidateSymbol with actual content. Pass the "Independent" party symbol here.
    /// </param>
    public static CandidateDetail ToCandidateDetail(
        this Candidate candidate,
        (byte[]? Content, string? ContentType)? independentSymbol = null)
    {
        byte[]? symbolContent;
        string? symbolContentType;
        string? symbolFileName;

        if (candidate.IsIndependent)
        {
            var ownMedia = candidate.CandidateSymbol?.CandidateSymbolMediaFile;
            if (ownMedia?.Content != null)
            {
                symbolContent = ownMedia.Content;
                symbolContentType = ownMedia.ContentType;
                symbolFileName = ownMedia.FileName;
            }
            else
            {
                symbolContent = independentSymbol?.Content;
                symbolContentType = independentSymbol?.ContentType;
                symbolFileName = null;
            }
        }
        else
        {
            var partyMedia = candidate.PoliticalParty?.SymbolMediaFile;
            symbolContent = partyMedia?.Content;
            symbolContentType = partyMedia?.ContentType;
            symbolFileName = partyMedia?.FileName;
        }

        return new CandidateDetail
        {
            CandidateId = candidate.CandidateId,
            CandidateImageId = candidate.CandidateImageId,
            FullName = $"{candidate.User.FirstNameEn} {candidate.User.LastNameEn}",
            ConstituencyId = candidate.ConstituencyId,
            ConstituencyName = candidate.Constituency.ConstituencyNameEn,
            IsIndependent = candidate.IsIndependent,
            PoliticalPartyName = candidate.IsIndependent ? "Independent" : candidate.PoliticalParty?.PoliticalPartyNameEn,
            PoliticalPartyId = candidate.PoliticalParty?.PoliticalPartyId,
            CandidateSymbolId = candidate.CandidateSymbol?.CandidateSymbolId,
            SymbolContent = symbolContent,
            SymbolContentType = symbolContentType,
            CandidateSymbolFileName = symbolFileName,
            SymbolName = candidate.IsIndependent ? candidate.CandidateSymbol?.CandidateSymbolNameEn : null,
            ImageContent = candidate.CandidateImageMediaFile?.Content,
            ImageContentType = candidate.CandidateImageMediaFile?.ContentType
        };
    }
}