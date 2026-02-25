using Microsoft.EntityFrameworkCore;
using NepalVotes.Application.Configuration;
using NepalVotes.Infrastructure.Persistence;

namespace NepalVotes.Api.BackgroundServices;

public class DatabaseWarmupService(
    IServiceProvider serviceProvider, 
    ILogger<DatabaseWarmupService> logger,
    IConfiguration configuration,
    AppSetting appSetting)
    : BackgroundService
{
    private readonly TimeSpan _interval = TimeSpan.FromMinutes(
        appSetting.DatabaseWarmup.IntervalInMinutes > 0 
            ? appSetting.DatabaseWarmup.IntervalInMinutes 
            : 30);

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("Database Warmup Service is starting. Interval: {Interval}", _interval);

        using var timer = new PeriodicTimer(_interval);

        try
        {
            while (await timer.WaitForNextTickAsync(stoppingToken))
            {
                await SendPingAsync(stoppingToken);
            }
        }
        catch (OperationCanceledException)
        {
            logger.LogInformation("Database Warmup Service is stopping.");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Database Warmup Service failed.");
        }
    }

    private async Task SendPingAsync(CancellationToken cancellationToken)
    {
        try
        {
            using var scope = serviceProvider.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            await db.Database.ExecuteSqlRawAsync("SELECT 1", cancellationToken);
            logger.LogInformation("DB keep-alive ping sent at {Time}.", DateTimeOffset.Now);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "DB keep-alive failed.");
        }
    }
}