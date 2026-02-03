using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.UserRegistrations;

namespace NepalVotes.Application.UserRegistrations;

public class RegisteredUsersManagementService (IUserRegistrationRepository registrationRepository) : IRegisteredUsersManagementService
{
    public async Task<ApiResponse<IEnumerable<UserRegistrationListItem>>> GetRegisteredUsersByDistrict(int districtId)
    {
        var registrations = await registrationRepository.GetByDistrictIdAsync(districtId);

        if (registrations.Count==0)
            return ApiResponse<IEnumerable<UserRegistrationListItem>>.SuccessResponse([],"No records found for this district.", 404);

        var listItems = registrations.Select(u => u.ToListItem()).ToList();
        return ApiResponse<IEnumerable<UserRegistrationListItem>>.SuccessResponse(listItems);
    }
}