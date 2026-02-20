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
            .Include(u => u.Ward)
                    .ThenInclude(m=>m.Municipality)
                        .ThenInclude(d=>d.District)
            .Where(u => u.Ward.Municipality.District.DistrictId == districtId)
            .AsNoTracking()
            .ToListAsync();
    }
    
    public async Task<UserRegistration?> GetRegistrationWithGeographicDetailsForReviewAsync(int id)
    {
        return await context.UserRegistrations
                .Include(v=>v.Ward)
                    .ThenInclude(m=>m.Municipality)
                        .ThenInclude(d=>d.District)
                            .ThenInclude(d=>d.Province)
            .Include(u => u.UserRegistrationDocuments)
            .FirstOrDefaultAsync(u => u.UserRegistrationId == id);
    }
    
    public async Task<UserRegistration?> GetRegistrationByIdAsync(int id)
    {
        return await context.UserRegistrations.FindAsync(id);
    }

    public async Task<(List<UserRegistration> Items, int TotalCount)> GetPaginatedRegistrationsAsync(int? districtId, string? fullName, string? nationalIdNumber, string? voterIdNumber, string? mobileNumber, int pageNumber, int pageSize)
    {
        var query = context.UserRegistrations
            .Include(u => u.Ward)
                .ThenInclude(w => w.Municipality)
                    .ThenInclude(m => m.District)
            .AsQueryable();

        if (districtId.HasValue && districtId != 0)
        {
            query = query.Where(u => u.Ward.Municipality.DistrictId == districtId);
        }

        if (!string.IsNullOrWhiteSpace(fullName))
        {
            var term = fullName.Trim().ToLower();
            query = query.Where(u =>
                u.FirstNameEn.ToLower().Contains(term) ||
                (u.MiddleNameEn != null && u.MiddleNameEn.ToLower().Contains(term)) ||
                u.LastNameEn.ToLower().Contains(term) ||
                u.FirstNameNp.Contains(term) ||
                (u.MiddleNameNp != null && u.MiddleNameNp.Contains(term)) ||
                u.LastNameNp.Contains(term)
            );
        }

        if (!string.IsNullOrWhiteSpace(nationalIdNumber))
        {
            var term = nationalIdNumber.Trim();
            query = query.Where(u => u.NationalIdNumber.Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(voterIdNumber))
        {
            var term = voterIdNumber.Trim();
            query = query.Where(u => u.VoterIdNumber.Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(mobileNumber))
        {
            var term = mobileNumber.Trim();
            query = query.Where(u => u.MobileNumber.Contains(term));
        }

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(u => u.RequestDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .AsNoTracking()
            .ToListAsync();

        return (items, totalCount);
    }

}