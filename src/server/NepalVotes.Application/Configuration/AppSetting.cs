namespace NepalVotes.Application.Configuration;

public class AppSetting
{
    public ConnectionString ConnectionString { get; set; } = new();
    public Logging Logging { get; set; } = new();
    public string AllowedHosts { get; set; } = "*";
    public string ClientUrl { get; set; } = "*";
    public string ClientCorsPolicy { get; set; } = "*";
    public AuthSetting AuthSetting { get; set; } = new();
}