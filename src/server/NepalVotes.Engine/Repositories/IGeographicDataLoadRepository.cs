using NepalVotes.Engine.Models;

namespace NepalVotes.Engine.Repositories;

public interface IGeographicDataLoadRepository
{
    Task SaveProvinceAsync( List<ProvinceJson> geographicData);
}