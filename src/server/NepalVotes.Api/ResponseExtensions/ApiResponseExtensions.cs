using Microsoft.AspNetCore.Mvc;
using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Api.ResponseExtensions;

public static class ApiResponseExtensions
{
    public static ActionResult ToActionResult<T>(this ApiResponse<T> response)
    {
        return response.Status switch
        {
            200 => new OkObjectResult(response),
            201 => new CreatedResult(string.Empty, response),
            400 => new BadRequestObjectResult(response),
            401 => new UnauthorizedObjectResult(response),
            403 => new ObjectResult(response) { StatusCode = 403 },
            404 => new NotFoundObjectResult(response),
            500 => new ObjectResult(response) { StatusCode = 500 },
            _ => new ObjectResult(response) { StatusCode = response.Status }
        };
    }
}