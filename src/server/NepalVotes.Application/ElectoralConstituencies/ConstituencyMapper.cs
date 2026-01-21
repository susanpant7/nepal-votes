using NepalVotes.Domain.ElectoralConstituencies;

namespace NepalVotes.Application.ElectoralConstituencies;

public class ConstituencyInfo
{
    public int ConstituencyId { get; set; }
    public string ConstituencyName { get; set; } = string.Empty;

    public int ProvinceId { get; set; }
    public int DistrictId { get; set; }
    public int MunicipalityId { get; set; }

    public List<int> WardIds { get; set; } = [];
}

public static class ConstituencyMapper
{
    public static ConstituencyInfo ToInfo(this Constituency constituency)
    {
        var firstWard = constituency.Wards?.FirstOrDefault();
        return new ConstituencyInfo
        {
            ConstituencyId = constituency.ConstituencyId,
            ConstituencyName = constituency.ConstituencyName,

            ProvinceId = firstWard?.Municipality?.District?.Province?.ProvinceId ?? 0,
            DistrictId = firstWard?.Municipality?.District?.DistrictId ?? 0,
            MunicipalityId = firstWard?.Municipality?.MunicipalityId ?? 0,

            WardIds = constituency.Wards?.Select(w => w.WardId).ToList() ?? []
        };
    }
}