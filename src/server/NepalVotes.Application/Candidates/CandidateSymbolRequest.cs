namespace NepalVotes.Application.Candidates;

public record AddCandidateSymbolRequest(
    byte[] FileContent,
    string FileName,
    string ContentType,
    long FileSize
);

public record UpdateCandidateSymbolRequest
(
    int CandidateSymbolId,
    byte[] FileContent,
    string FileName,
    string ContentType,
    long FileSize
);
