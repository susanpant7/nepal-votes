using NepalVotes.Domain.Users;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Infrastructure.Users;

using Microsoft.EntityFrameworkCore;

public class UserRepository(ApplicationDbContext context) : IUserRepository
{
    public async Task<User?> GetByMobileNumberAsync(string mobileNumber)
    {
        return await context.Users
            .FirstOrDefaultAsync(u => u.MobileNumber == mobileNumber);
    }
    
    public async Task<User?> GetUserWithRolesByMobileNumberAsync(string mobileNumber)
    {
        return await context.Users
            .Include(u => u.Roles)             // Eager load Roles
            .FirstOrDefaultAsync(u => u.MobileNumber == mobileNumber);
    }
    
    public async Task<User?> GetUserWithRolesByUserIdAsync(int userId)
    {
        return await context.Users
            .Include(u => u.Roles)
            .Include(u => u.UserDocuments)
                .ThenInclude(d => d.UserDocumentMediaFile)
            .FirstOrDefaultAsync(u => u.UserId == userId);
    }
    
    public async Task<User?> GetUserWithVotingPlaceByUserIdAsync(int userId)
    {
        return await context.Users
                .Include(u => u.Roles)
                .Include(u => u.UserDocuments)
                    .ThenInclude(d => d.UserDocumentMediaFile)
                .Include(vp => vp.Ward)
                    .ThenInclude(w => w.Municipality)
                        .ThenInclude(m => m.District)
                            .ThenInclude(d => d.Province)
                .Include(vp => vp.Ward)
                    .ThenInclude(w => w.Constituency)
            .FirstOrDefaultAsync(u => u.UserId == userId);
    }
    
    public async Task<List<User>> SearchUsersAsync(string searchText)
    {
        if (string.IsNullOrWhiteSpace(searchText))
            return [];

        searchText = searchText.Trim();

        return await context.Users
            .Where(u => EF.Functions.Like(u.FullNameEn, $"%{searchText}%"))
            .OrderBy(u => u.FullNameEn)
            .Take(100)
            .ToListAsync();
    }
    
    public async Task<bool> AnyByWardIdAsync(int wardId)
    {
        return await context.Users
            .AnyAsync(u => u.WardId == wardId);
    }

    public async Task<int?> GetUserConstituencyIdAsync(int userId)
    {
        return await context.Users
            .Where(u => u.UserId == userId)
            .Select(u => u.Ward.ConstituencyId)
            .FirstOrDefaultAsync();
    }
    public async Task<string?> GetUserConstituencyNameAsync(int userId)
    {
        return await context.Users
            .AsNoTracking()
            .Where(u => u.UserId == userId)
            .Select(u => u.Ward.Constituency != null 
                ? u.Ward.Constituency.ConstituencyNameEn 
                : null)
            .FirstOrDefaultAsync();
    }
    
    public async Task AddUserAsync(User user)
    {
        await context.Users.AddAsync(user);
    }

    public async Task<List<User>> GetByMobileNumberOrNationalIdOrVoterIdAsync(string mobileNumber, string nationalId, string voterId)
    {
        return await context.Users
            .AsNoTracking()
            .Where(x=> x.MobileNumber==mobileNumber || x.NationalIdNumber==nationalId || x.VoterIdNumber==voterId)
            .ToListAsync();
    }

    public async Task<(List<User> Users, int TotalCount)> GetFilteredUsersAsync(
        int? userId,
        string? mobileNumber,
        string? nationalId,
        string? voterId,
        int? provinceId, 
        int? districtId, 
        int? municipalityId,
        string? role,
        int? roleId,
        UserStatus? status,
        int page,
        int pageSize)
    {
        var query = context.Users
            .Include(u => u.Roles)
            .Include(u => u.Ward)
                .ThenInclude(w => w.Municipality)
                    .ThenInclude(m => m.District)
                        .ThenInclude(d => d.Province)
            .AsQueryable();

        // Specific Field Filters
        if (userId.HasValue)
        {
            query = query.Where(u => u.UserId == userId.Value);
        }

        if (!string.IsNullOrWhiteSpace(mobileNumber))
        {
            query = query.Where(u => u.MobileNumber.Contains(mobileNumber.Trim()));
        }

        if (!string.IsNullOrWhiteSpace(nationalId))
        {
            query = query.Where(u => u.NationalIdNumber.Contains(nationalId.Trim()));
        }

        if (!string.IsNullOrWhiteSpace(voterId))
        {
            query = query.Where(u => u.VoterIdNumber.Contains(voterId.Trim()));
        }

        // Geography Filters
        if (provinceId.HasValue)
        {
            query = query.Where(u => u.Ward.Municipality.District.ProvinceId == provinceId.Value);
        }

        if (districtId.HasValue)
        {
            query = query.Where(u => u.Ward.Municipality.DistrictId == districtId.Value);
        }

        if (municipalityId.HasValue)
        {
            query = query.Where(u => u.Ward.MunicipalityId == municipalityId.Value);
        }

        if (roleId.HasValue)
        {
            query = query.Where(u => u.Roles.Any(r => r.RoleId == roleId.Value));
        }

        // Role & Status Filters
        if (!string.IsNullOrWhiteSpace(role))
        {
            var normalizedRole = role.Trim().ToLower();
            query = query.Where(u => u.Roles.Any(r => r.RoleName.Trim().ToLower() == normalizedRole));
        }

        if (status.HasValue)
        {
            query = query.Where(u => u.Status == status.Value);
        }

        var totalCount = await query.CountAsync();
        
        var users = await query
            .OrderByDescending(u => u.RequestDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (users, totalCount);
    }

    public async Task UpdateUserAsync(User user)
    {
        context.Users.Update(user);
        await Task.CompletedTask;
    }

    public async Task DeleteUserAsync(User user)
    {
        context.Users.Remove(user);
        await Task.CompletedTask;
    }
}