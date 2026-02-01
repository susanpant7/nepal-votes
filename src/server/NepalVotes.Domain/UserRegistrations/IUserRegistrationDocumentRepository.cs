namespace NepalVotes.Domain.UserRegistrations;

public interface IUserRegistrationDocumentRepository
{
    Task AddRangeAsync(IEnumerable<UserRegistrationDocument> documents);
    Task<IEnumerable<UserRegistrationDocument>> GetByRegistrationIdAsync(int registrationId);
    Task DeleteRangeAsync(IEnumerable<UserRegistrationDocument> documents);
}