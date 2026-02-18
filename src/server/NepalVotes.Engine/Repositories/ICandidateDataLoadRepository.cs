namespace NepalVotes.Engine.Repositories;

public interface ICandidateDataLoadRepository
{
    Task ImportCandidatesFromJsonAsync(string jsonFilePath);
}