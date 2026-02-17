namespace NepalVotes.Engine.Services;

public interface IDataLoadService
{
    Task<bool> LoadProvincesDistrictsMunicipalitiesWardsAsync();
    Task<bool> LoadPoliticalPartiesAsync();
    Task<bool> LoadConstituenciesAsync();
}