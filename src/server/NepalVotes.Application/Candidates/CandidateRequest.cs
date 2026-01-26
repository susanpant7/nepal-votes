namespace NepalVotes.Application.Candidates;

public record CandidateAddRequest
(
    string FirstName,
    string LastName
);

public record CandidateUpdateRequest
(
    int CandidateId,
    string FirstName,
    string LastName
);