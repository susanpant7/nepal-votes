namespace NepalVotes.Engine.Repositories;

public interface IPoliticalPartyDataLoadRepository
{
    Task<bool> ImportPartiesFromJsonAsync(string jsonFilePath);
}