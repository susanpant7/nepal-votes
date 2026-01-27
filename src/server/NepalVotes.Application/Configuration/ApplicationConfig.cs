using Microsoft.Extensions.DependencyInjection;
using NepalVotes.Application.Authentication;
using NepalVotes.Application.Candidates;
using NepalVotes.Application.ElectoralConstituencies;
using NepalVotes.Application.ElectoralGeographies;
using NepalVotes.Application.PoliticalParties;
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
        services.AddScoped<IUserRefreshTokenService , UserRefreshTokenService>();
        services.AddScoped<IPoliticalPartyService , PoliticalPartyService>();
        services.AddScoped<IProvinceService, ProvinceService>();
        services.AddScoped<IDistrictService, DistrictService>();
        services.AddScoped<IMunicipalityService, MunicipalityService>();
        services.AddScoped<IWardService, WardService>();
        services.AddScoped<IVotingPlaceService, VotingPlaceService>();
        services.AddScoped<IConstituencyService, ConstituencyService>();
        services.AddScoped<ICandidateService, CandidateService>();
        services.AddScoped<ICandidateSymbolService, CandidateSymbolService>();
        
        return services;
    }
}