using NepalVotes.Application.Configuration;

namespace NepalVotes.Api.Configuration;

public static class AuthConfig
{
    public static IServiceCollection AddAuth(this IServiceCollection services, AppSetting appSettings)
    {
        // var authSettings = appSettings.AuthSetting;
        // // JWT Authentication
        // services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        //     .AddJwtBearer(options =>
        //     {
        //         options.TokenValidationParameters = new TokenValidationParameters
        //         {
        //             ValidateIssuer = true,
        //             ValidIssuer = authSettings.Issuer,
        //
        //             ValidateAudience = true,
        //             ValidAudience = authSettings.Audience,
        //
        //             ValidateLifetime = true,
        //
        //             ValidateIssuerSigningKey = true,
        //             IssuerSigningKey = new SymmetricSecurityKey(
        //                 Encoding.UTF8.GetBytes(authSettings.Secret)),
        //         };
        //     });

        // Authorization (policy-less)
        services.AddAuthorization();

        return services;
    }
}