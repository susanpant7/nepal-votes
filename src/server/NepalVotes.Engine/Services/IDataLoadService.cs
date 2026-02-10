namespace NepalVotes.Engine.Services;

public interface IDataLoadService
{
    Task<bool> LoadProvincesDistrictsMunicipalitiesWardsAsync();
}