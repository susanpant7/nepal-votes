using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.Authentication;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.UserRegistrations;

namespace NepalVotes.Api.UserRegistrations;

[ApiController]
[Authorize(Roles = "ADMIN,SUPER_ADMIN")]
[Route("api/registered-users")]
public class UserRegistrationManagementController (IRegisteredUsersManagementService registrationService) : ControllerBase
{
    [HttpGet("by-district/{districtId:int}")]
    public async Task<IActionResult> GetByDistrict(int districtId)
    {
        var response = await registrationService.GetRegisteredUsersByDistrict(districtId);
        return response.ToActionResult();
    }
    
    [HttpGet]
    public async Task<IActionResult> GetReviewDetails([FromQuery]int userRegistrationId)
    {
        var response = await registrationService.GetReviewDetailsAsync(userRegistrationId);
        return response.ToActionResult();
    }
    
    [HttpPut("approve")]
    [Authorize(Roles = "SUPER_ADMIN")]
    public async Task<IActionResult> Approve([FromBody] UserRegistrationReviewRequest request)
    {
        var approvedByUserId = HttpContext.User.GetUserId();
        var result = await registrationService.ApproveAsync(request, approvedByUserId);
        return StatusCode(result.StatusCode, result);
    }

    [HttpPut("reject")]
    [Authorize(Roles = "SUPER_ADMIN")]
    public async Task<IActionResult> Reject([FromBody] UserRegistrationReviewRequest request)
    {
        var result = await registrationService.RejectAsync(request);
        return StatusCode(result.StatusCode, result);
    }
}