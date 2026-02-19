using NepalVotes.Domain.Candidates;

namespace NepalVotes.Application.Candidates;

public class CandidateSymbolInfo
{
    public int CandidateSymbolId { get; set; }

    public byte[] SymbolContent { get; set; }
    public string SymbolContentType { get; set; }
    public string SymbolFileName { get; set; }
}

public static class CandidateSymbolMapper
{
    public static CandidateSymbolInfo ToSymbolInfo(this CandidateSymbol symbol)
    {
        return new CandidateSymbolInfo
        {
            CandidateSymbolId = symbol.CandidateSymbolId,
            SymbolContent = symbol?.CandidateSymbolMediaFile?.Content,
            SymbolContentType = symbol?.CandidateSymbolMediaFile?.ContentType,
            SymbolFileName = symbol?.CandidateSymbolMediaFile?.FileName
        };
    }
}
