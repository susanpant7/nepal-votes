namespace NepalVotes.Engine.Repositories;

public interface IConstituencyDataLoadRepository
{
    Task ProcessElectoralMappingAsync(string jsonFilePath);
}