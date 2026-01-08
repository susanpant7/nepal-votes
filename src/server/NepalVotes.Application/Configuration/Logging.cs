namespace NepalVotes.Application.Configuration;

public class Logging
{
    public LogLevel LogLevel { get; set; } = new();
}
public class LogLevel
{
    public string Default { get; set; } = "Information";
    public string MicrosoftAspNetCore { get; set; } = "Warning";
}