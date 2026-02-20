namespace NepalVotes.Domain.Users;

public interface IUserRepository
{
    Task<User?> GetByMobileNumberAsync(string mobileNumber);
    Task<User?> GetUserWithRolesByMobileNumberAsync(string mobileNumber);
    Task<User?> GetUserWithRolesByUserIdAsync(int userId);
    Task<User?> GetUserWithVotingPlaceByUserIdAsync(int userId);
    Task<List<User>> SearchUsersAsync(string searchText);
    Task<bool> AnyByWardIdAsync(int votingPlaceId);
    Task<int?> GetUserConstituencyIdAsync(int userId);
    Task<string?> GetUserConstituencyNameAsync(int userId);
    Task AddUserAsync(User user);
    Task<List<User>> GetByMobileNumberOrNationalIdOrVoterIdAsync(string mobileNumber, string nationalId,string voterId);
    
    // New methods for full user management
    Task<(List<User> Users, int TotalCount)> GetFilteredUsersAsync(
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
        int pageSize);
    Task UpdateUserAsync(User user);
    Task DeleteUserAsync(User user);
}