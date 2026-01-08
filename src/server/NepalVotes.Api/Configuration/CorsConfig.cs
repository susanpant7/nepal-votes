using NepalVotes.Application.Configuration;

namespace NepalVotes.Api.Configuration;

public static class CorsConfig
{
    public static void AddCorsPolicy(this IServiceCollection services, AppSetting appSettings)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(appSettings.ClientCorsPolicy, policy =>
            {
                policy
                    .WithOrigins(appSettings.ClientUrl) // React dev server
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials(); // if you need cookies/auth headers
            });
        });

    }
}