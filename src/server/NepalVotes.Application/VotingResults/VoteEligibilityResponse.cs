namespace NepalVotes.Application.VotingResults;

public record VoteEligibilityResponse
{
    public bool CanVote { get; init; }
    public string Message { get; init; }
    public DateTime CheckedAt { get; init; }
}