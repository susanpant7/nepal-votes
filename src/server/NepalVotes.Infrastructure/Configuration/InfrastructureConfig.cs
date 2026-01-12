using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.Users;
using NepalVotes.Infrastructure.Persistence;
using NepalVotes.Infrastructure.Users;

namespace NepalVotes.Infrastructure.Configuration;

public static class InfrastructureConfig
{
    public static IServiceCollection AddInfrastructureConfig(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Register DbContext
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(connectionString));
        services.AddScoped<AuditInterceptor>();

        // Register Repositories
        services.AddScoped<IUserRepository, UserRepository>();
        

        // Register UnitOfWork
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }
}