using System.Text.Json;
using NepalVotes.Engine.Models;
using NepalVotes.Engine.Repositories;

namespace NepalVotes.Engine.Services;

public class DataLoadService (IWebHostEnvironment env, 
    IGeographicDataLoadRepository geographicDataLoadRepository,
    IPoliticalPartyDataLoadRepository politicalPartyDataLoadRepository,
    IConstituencyDataLoadRepository constituencyDataLoadRepository) : IDataLoadService
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
        await geographicDataLoadRepository.SaveProvinceAsync(englishJsonObject,nepaliJsonObject);
        return true;
    }

    public async Task<bool> LoadPoliticalPartiesAsync()
    {
        var filePath = Path.Combine(
            env.ContentRootPath,
            "LoadFiles",
            "PoliticalParties_En_Np.json");
        return await politicalPartyDataLoadRepository.ImportPartiesFromJsonAsync(filePath);
    }
    
    public async Task<bool> LoadConstituenciesAsync()
    {
        var filePath = Path.Combine(
            env.ContentRootPath,
            "LoadFiles",
            "Constituencies.json");
        await constituencyDataLoadRepository.ProcessElectoralMappingAsync(filePath);
        return true;
    }
}