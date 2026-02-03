
using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.UserRegistrations;

public interface IRegisteredUsersManagementService
{
    Task<ApiResponse<IEnumerable<UserRegistrationListItem>>> GetRegisteredUsersByDistrict(int districtId);
    Task<ApiResponse<UserRegistrationReviewDetail>> GetReviewDetailsAsync(int id);
    Task<ApiResponse<bool>> ApproveAsync(UserRegistrationReviewRequest request,int approvedByUserId);
    Task<ApiResponse<bool>> RejectAsync(UserRegistrationReviewRequest request);
}