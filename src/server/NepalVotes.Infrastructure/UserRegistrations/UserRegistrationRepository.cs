using Microsoft.EntityFrameworkCore;
using NepalVotes.Domain.UserRegistrations;
using NepalVotes.Domain.Users;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.UserRegistrations;

public class UserRegistrationRepository(ApplicationDbContext context) : IUserRegistrationRepository
{
    public async Task<UserRegistration> AddAsync(UserRegistration registration)
    {
        context.UserRegistrations.Add(registration);
        await context.SaveChangesAsync();
        return registration;
    }

    // Finds any active request (OtpPending or Pending) for a given mobile number
    public async Task<UserRegistration?> GetByMobileNumberAsync(string mobileNumber)
    {
        return await context.UserRegistrations
            .Include(ur => ur.UserRegistrationDocuments)
            .FirstOrDefaultAsync(ur =>
                ur.MobileNumber == mobileNumber &&
                (ur.Status == UserStatus.OtpPending || ur.Status == UserStatus.Pending)
            );
    }
    
    public async Task DeleteOldRegistrationsExceptLatestAsync(string mobileNumber, int latestRegistrationId)
    {
        if (latestRegistrationId != 0)
        {
            await context.UserRegistrations
                .Where(x => x.MobileNumber == mobileNumber && x.UserRegistrationId != latestRegistrationId)
                .ExecuteDeleteAsync();
        }
    }
    
    public async Task<UserRegistration?> GetLatestActiveRegistrationAsync(string mobileNumber)
    {
        return await context.UserRegistrations
            .Where(x => x.MobileNumber == mobileNumber)
            .OrderByDescending(x => x.OtpCreatedAt)
            .FirstOrDefaultAsync();
    }

    public async Task<UserRegistration?> GetByIdWithDocumentsAsync(int registrationId)
    {
        return await context.UserRegistrations
            .Include(ur => ur.UserRegistrationDocuments)
            .FirstOrDefaultAsync(ur => ur.UserRegistrationId == registrationId);
    }

    public async Task UpdateAsync(UserRegistration registration)
    {
        context.UserRegistrations.Update(registration);
        await Task.CompletedTask;
    }

    public async Task DeleteAsync(UserRegistration registration)
    {
        context.UserRegistrations.Remove(registration);
        await Task.CompletedTask;
    }
    
    public async Task<List<UserRegistration>> GetByDistrictIdAsync(int districtId)
    {
        return await context.UserRegistrations
            .Include(u => u.VotingPlace)
                .ThenInclude(v=>v.Ward)
                    .ThenInclude(m=>m.Municipality)
                        .ThenInclude(d=>d.District)
            .Where(u => u.VotingPlace.Ward.Municipality.District.DistrictId == districtId)
            .AsNoTracking()
            .ToListAsync();
    }
}