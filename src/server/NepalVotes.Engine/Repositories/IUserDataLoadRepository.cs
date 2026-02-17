namespace NepalVotes.Engine.Repositories;

public interface IUserDataLoadRepository
{
    Task<bool> ImportUsersFromJsonAsync(string jsonFilePath);
}