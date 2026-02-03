
using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.UserRegistrations;

public interface IRegisteredUsersManagementService
{
    Task<ApiResponse<IEnumerable<UserRegistrationListItem>>> GetRegisteredUsersByDistrict(int districtId);
}