namespace NepalVotes.Api.Candidates;

public record AddCandidateSymbolApiRequest
(
    IFormFile CandidateSymbolFile
);

public record UpdateCandidateSymbolApiRequest
(
    int CandidateSymbolId,
    IFormFile CandidateSymbolFile
);
