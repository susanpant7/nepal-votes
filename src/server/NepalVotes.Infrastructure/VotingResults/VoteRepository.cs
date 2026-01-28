using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.VotingResults;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.VotingResults;

public class VoteRepository(ApplicationDbContext context) : IVoteRepository
{
    public async Task<bool> HasUserVotedAsync(int userId)
    {
        return await context.Votes
            .AnyAsync(v => v.CreatedBy == userId);
    }

    public async Task AddAsync(Vote vote)
    {
        await context.Votes.AddAsync(vote);
    }
}