namespace NepalVotes.Domain.UserRegistrations;

public interface IUserRegistrationRepository
{
    Task<UserRegistration> AddAsync(UserRegistration registration);
    Task<UserRegistration?> GetByMobileNumberAsync(string mobileNumber);
    Task DeleteOldRegistrationsExceptLatestAsync(string mobileNumber, int latestRegistrationId);
    Task<UserRegistration?> GetLatestActiveRegistrationAsync(string mobileNumber);
    Task<UserRegistration?> GetByIdWithDocumentsAsync(int registrationId);
    Task UpdateAsync(UserRegistration registration);
    Task DeleteAsync(UserRegistration registration);
}