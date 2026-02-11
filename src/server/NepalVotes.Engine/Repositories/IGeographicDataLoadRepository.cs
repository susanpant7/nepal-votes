using NepalVotes.Engine.Models;

namespace NepalVotes.Engine.Repositories;

public interface IGeographicDataLoadRepository
{
    Task SaveProvinceAsync(List<ProvinceEn> englishJsonObject, List<ProvinceNp> geographicData);
}