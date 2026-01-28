namespace NepalVotes.Application.Candidates;

public record CandidateAddRequest
(
    int UserId,
    int? PoliticalPartyId,
    bool IsIndependent,
    int ConstituencyId,
    int? CandidateSymbolId
);

public record CandidateUpdateRequest
(
    int CandidateId,
    int UserId,
    int? PoliticalPartyId,
    bool IsIndependent,
    int ConstituencyId,
    int? CandidateSymbolId
);