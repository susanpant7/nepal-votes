using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NepalVotes.Application.Authentication;
using NepalVotes.Application.Users;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.PoliticalParties;
using NepalVotes.Domain.Users;
using NepalVotes.Infrastructure.Authentication;
using NepalVotes.Infrastructure.Hashers;
using NepalVotes.Infrastructure.Persistence;
using NepalVotes.Infrastructure.PoliticalParties;
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

        //Register application interfaces
        services.AddScoped<IOtpHashingService, OtpHashingService>();
        services.AddScoped<ITokenGenerator, TokenGenerator>();
        
        // Register Repositories
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IUserOtpRepository, UserOtpRepository>();
        services.AddScoped<IUserRefreshTokenRepository, UserRefreshTokenRepository>();
        services.AddScoped<IPoliticalPartyRepository, PoliticalPartyRepository>();
        

        // Register UnitOfWork
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }
}