namespace NepalVotes.Application.Configuration;

public class AuthSetting
{
    public const string SectionName = "AuthSetting";

    public string Secret { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
}