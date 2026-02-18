using Microsoft.AspNetCore.Mvc;
using NepalVotes.Engine.Services;

namespace NepalVotes.Engine.Controllers;

[ApiController]
[Route("api/candidate-data-load")]
public class CandidateDataLoadController(IDataLoadService dataLoadService): ControllerBase
{
    [HttpPost]
    public async Task<bool> GetCandidates()
    {
        return await dataLoadService.LoadCandidates();
    }
}