namespace NepalVotes.Domain.VotingResults;

public interface IVoteRepository
{
    Task<bool> HasUserVotedAsync(int userId);
    Task AddAsync(Vote vote);
}