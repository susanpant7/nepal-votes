using System.Text.Json;
using NepalVotes.Engine.Models;
using NepalVotes.Engine.Repositories;

namespace NepalVotes.Engine.Services;

public class DataLoadService (IWebHostEnvironment env, 
    IGeographicDataLoadRepository dataLoadRepository) : IDataLoadService
{
    public async Task<bool> LoadProvincesDistrictsMunicipalitiesWardsAsync()
    {
        var englishFilePath = Path.Combine(
            env.ContentRootPath,
            "LoadFiles",
            "GeographicLocations_En.json");
        var nepaliFilePath = Path.Combine(
            env.ContentRootPath,
            "LoadFiles",
            "GeographicLocations_Np.json");
        var englishJson = await File.ReadAllTextAsync(englishFilePath);
        var nepaliJson = await File.ReadAllTextAsync(nepaliFilePath);
        var englishJsonObject = JsonSerializer.Deserialize<List<ProvinceEn>>(englishJson);
        var nepaliJsonObject = JsonSerializer.Deserialize<List<ProvinceNp>>(nepaliJson);
        if (englishJsonObject == null) throw new NullReferenceException("English Province json is null");
        if (nepaliJsonObject == null) throw new NullReferenceException("Nepali Province json is null");
        await dataLoadRepository.SaveProvinceAsync(englishJsonObject,nepaliJsonObject);
        return true;
    }
}