using System.Text.Json;
using NepalVotes.Engine.Models;
using NepalVotes.Engine.Repositories;

namespace NepalVotes.Engine.Services;

public class DataLoadService (IWebHostEnvironment env, 
    IGeographicDataLoadRepository dataLoadRepository) : IDataLoadService
{
    public async Task<bool> LoadProvincesDistrictsMunicipalitiesWardsAsync()
    {
        var filePath = Path.Combine(
            env.ContentRootPath,
            "LoadFiles",
            "GeographicLocations_En.json");
        var json = await File.ReadAllTextAsync(filePath);
        var provinceJson = JsonSerializer.Deserialize<List<ProvinceJson>>(json);
        if (provinceJson == null) throw new NullReferenceException("Province json is null");
        await dataLoadRepository.SaveProvinceAsync(provinceJson);
        return true;
    }
}