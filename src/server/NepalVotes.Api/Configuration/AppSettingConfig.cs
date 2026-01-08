using NepalVotes.Application.Configuration;

namespace NepalVotes.Api.Configuration;

public static class AppSettingConfig
{
    public static AppSetting AddAppSettings(this IServiceCollection services, IConfiguration configuration)
    {
        var appSettings = new AppSetting();
        configuration.Bind(appSettings);

        // Make it injectable via DI
        services.AddSingleton(appSettings);

        return appSettings;
    }
}