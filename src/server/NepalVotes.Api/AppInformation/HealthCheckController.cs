using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Api.AppInformation;

[ApiController]
[Route("api/health-check")]
[AllowAnonymous]
public class HealthCheckController(ApplicationDbContext dbContext) : ControllerBase
{
    private static readonly DateTimeOffset StartTime = DateTimeOffset.UtcNow;

    [HttpGet]
    public async Task<IActionResult> GetHealth()
    {
        var report = new
        {
            Status = "Healthy",
            Uptime = GetUptime(),
            Timestamp = DateTime.UtcNow,
            Database = await CheckDatabaseAsync(),
            Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")
        };

        return Ok(report);
    }

    private async Task<string> CheckDatabaseAsync()
    {
        try
        {
            await dbContext.Database.ExecuteSqlRawAsync("SELECT 1");
            return "Connected";
        }
        catch (Exception ex)
        {
            return $"Disconnected: {ex.Message}";
        }
    }

    private static string GetUptime()
    {
        var uptime = DateTimeOffset.UtcNow - StartTime;
        return $"{uptime.Days}d {uptime.Hours}h {uptime.Minutes}m {uptime.Seconds}s";
    }
}