using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.UserRegistrations;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.UserRegistrations;

public class UserRegistrationDocumentRepository(ApplicationDbContext dbContext) : IUserRegistrationDocumentRepository
{
    public async Task AddRangeAsync(IEnumerable<UserRegistrationDocument> documents)
    {
        dbContext.UserRegistrationDocuments.AddRange(documents);
        await Task.CompletedTask;
    }

    public async Task<IEnumerable<UserRegistrationDocument>> GetByRegistrationIdAsync(int registrationId)
    {
        return await dbContext.UserRegistrationDocuments
            .Where(d => d.UserRegistrationId == registrationId)
            .ToListAsync();
    }

    public async Task DeleteRangeAsync(IEnumerable<UserRegistrationDocument> documents)
    {
        dbContext.UserRegistrationDocuments.RemoveRange(documents);
        await Task.CompletedTask;
    }
}
