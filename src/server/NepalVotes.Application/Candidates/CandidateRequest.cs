namespace NepalVotes.Application.Candidates;

public record CandidateAddRequest
(
    int UserId,
    int? PoliticalPartyId,
    bool IsIndependent,
    int ConstituencyId,
    int? CandidateSymbolId,
    int? CandidateImageId = null,
    byte[]? ImageContent = null,
    string? ImageContentType = null,
    string? ImageFileName = null,
    long? ImageFileSize = null
);

public record CandidateUpdateRequest
(
    int CandidateId,
    int UserId,
    int? PoliticalPartyId,
    bool IsIndependent,
    int ConstituencyId,
    int? CandidateSymbolId,
    int? CandidateImageId = null,
    byte[]? ImageContent = null,
    string? ImageContentType = null,
    string? ImageFileName = null,
    long? ImageFileSize = null
);