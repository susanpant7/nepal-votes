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
    [HttpGet("search")]
    public async Task<IActionResult> Search(
        [FromQuery] int? districtId, 
        [FromQuery] string? searchTerm, 
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 10)
    {
        var response = await registrationService.GetPaginatedRegistrations(districtId, searchTerm, pageNumber, pageSize);
        return response.ToActionResult();
    }

    [HttpGet("by-district/{districtId:int}")]
    public async Task<IActionResult> GetByDistrict(int districtId)
    {
        var response = await registrationService.GetPaginatedRegistrations(districtId, null, 1, 1000);
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