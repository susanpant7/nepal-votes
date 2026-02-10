using Microsoft.AspNetCore.Mvc;
using NepalVotes.Engine.Services;

namespace NepalVotes.Engine.Controllers;

[ApiController]
[Route("api/geographic-data-load")]
public class GeographicDataLoadController (IDataLoadService dataLoadService) : ControllerBase
{
    [HttpPost]
    public async Task<bool> Get()
    {
        await dataLoadService.LoadProvincesDistrictsMunicipalitiesWardsAsync();
        return true;
    }
}