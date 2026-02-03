using Microsoft.AspNetCore.Mvc;
using NepalVotes.Api.ResponseExtensions;
using NepalVotes.Application.UserRegistrations;

namespace NepalVotes.Api.UserRegistrations;

[ApiController]
[Route("api/registered-users")]
public class UserRegistrationManagementController (IRegisteredUsersManagementService registrationService) : ControllerBase
{
    [HttpGet("by-district/{districtId:int}")]
    public async Task<IActionResult> GetByDistrict(int districtId)
    {
        var response = await registrationService.GetRegisteredUsersByDistrict(districtId);
        return response.ToActionResult();
    }
}