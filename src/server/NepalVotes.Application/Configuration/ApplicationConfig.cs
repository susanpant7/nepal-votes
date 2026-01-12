using Microsoft.Extensions.DependencyInjection;
using NepalVotes.Application.Users;

namespace NepalVotes.Application.Configuration;

public static class ApplicationConfig
{
    public static IServiceCollection AddApplicationConfig(this IServiceCollection services)
    {
        // Services
        services.AddScoped<IAuthService , AuthService>();
        services.AddScoped<IUserService , UserService>();
        services.AddScoped<IOtpService , OtpService>();

        return services;
    }
}