using Microsoft.AspNetCore.Mvc.Authorization;
using NepalVotes.Api.BackgroundServices;
using NepalVotes.Application.Configuration;

namespace NepalVotes.Api.Configuration;

public static class ApiConfig
{
    public static IServiceCollection AddApiConfig(this IServiceCollection services, IConfiguration configuration)
    {
        var appSettings = services.AddAppSettings(configuration);

        services.AddHttpContextAccessor();
        
        services.AddAuth(appSettings);
        
        // Global Authorization Filter (all controllers require [Authorize])
        services.AddControllers(options =>
        {
            options.Filters.Add(new AuthorizeFilter());
        });
        
        services.AddCorsPolicy(appSettings);
        
        services.AddHostedService<DatabaseWarmupService>();

        return services;
    }

    public static IApplicationBuilder UseApiConfig(this WebApplication app)
    {
        var appSettings = app.Services.GetRequiredService<AppSetting>();

        //app.UseHttpsRedirection();

        app.UseCors(appSettings.ClientCorsPolicy);

        app.UseAuthentication();

        app.UseAuthorization();

        app.MapControllers();

        //app.MapHealthChecks("/health");

        return app;
    }
    
}
