using System.ComponentModel.DataAnnotations;

namespace NepalVotes.Application.VotingResults;

public record SubmitVoteRequest (
    [Required]
    int CandidateId,
    [Required]
    int PartyId,
    [Required]
    string VotedFromLocation
);