using Microsoft.AspNetCore.Mvc;
using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Api.ResponseExtensions;

public static class ApiResponseExtensions
{
    public static ActionResult ToActionResult<T>(this ApiResponse<T> response)
    {
        return response.StatusCode switch
        {
            // 2xx Success
            StatusCode.Ok => new OkObjectResult(response),
            StatusCode.Created => new CreatedResult(string.Empty, response),
            StatusCode.Accepted => new AcceptedResult(string.Empty, response),
            StatusCode.NoContent => new NoContentResult(),

            // 4xx Client Errors
            StatusCode.BadRequest => new BadRequestObjectResult(response),
            StatusCode.Unauthorized => new UnauthorizedObjectResult(response),
            StatusCode.Forbidden => new ObjectResult(response) { StatusCode = StatusCode.Forbidden },
            StatusCode.NotFound => new NotFoundObjectResult(response),
            StatusCode.Conflict => new ConflictObjectResult(response),
            StatusCode.Gone => new ObjectResult(response) { StatusCode = StatusCode.Gone },
            StatusCode.PayloadTooLarge => new ObjectResult(response) { StatusCode = StatusCode.PayloadTooLarge },
            StatusCode.Unprocessable => new UnprocessableEntityObjectResult(response),
            StatusCode.TooManyRequests => new ObjectResult(response) { StatusCode = StatusCode.TooManyRequests },

            // 5xx Server Errors
            StatusCode.InternalError => new ObjectResult(response) { StatusCode = StatusCode.InternalError },
            StatusCode.NotImplemented => new ObjectResult(response) { StatusCode = StatusCode.NotImplemented },
            StatusCode.ServiceUnavailable => new ObjectResult(response) { StatusCode = StatusCode.ServiceUnavailable },

            // Default fallback for any other codes
            _ => new ObjectResult(response) { StatusCode = response.StatusCode }
        };
    }
}