using Microsoft.Extensions.DependencyInjection;

namespace NepalVotes.Application.Configuration;

public static class ApplicationConfig
{
    public static IServiceCollection AddApplicationConfig(this IServiceCollection services)
    {
        // Services
        // services.AddScoped<IAbcService , AbcService>();

        return services;
    }
}