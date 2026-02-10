using NepalVotes.Domain.ElectoralConstituencies;

namespace NepalVotes.Application.ElectoralConstituencies;

public class ConstituencyDetail
{
    public int ConstituencyId { get; set; }
    public string ConstituencyName { get; set; } = string.Empty;
    public int ProvinceId { get; set; }
    public required string ProvinceName { get; set; }
    public int DistrictId { get; set; }
    public required string DistrictName { get; set; }
    public List<int> WardIds { get; set; } = [];
    public List<MunicipalityWardInfo> MunicipalityWardInfos { get; set; } = [];
}

public class MunicipalityWardInfo
{
    public int MunicipalityId { get; set; }
    public string MunicipalityName { get; set; } = string.Empty;
    public List<WardIdNumber> WardIdNumbers { get; set; } = [];
}

public class WardIdNumber
{
    public int WardId { get; set; }
    public int WardNumber { get; set; }
}


public static class ConstituencyDetailMapper
{
    public static ConstituencyDetail ToDetail(this Constituency constituency)
    {
        var wards = constituency.Wards ?? [];

        var firstWard = wards.FirstOrDefault();
        var district = firstWard?.Municipality?.District;
        var province = district?.Province;
        return new ConstituencyDetail
        {
            ConstituencyId = constituency.ConstituencyId,
            ConstituencyName = constituency.ConstituencyName,
            ProvinceId = province?.ProvinceId ?? 0,
            ProvinceName =  province?.ProvinceNameEn ?? "",
            DistrictId = district?.DistrictId ?? 0,
            DistrictName = district?.DistrictNameEn ?? "",
            WardIds = wards.Select(ward => ward.WardId).ToList(),
            MunicipalityWardInfos = wards
                .GroupBy(w => w.Municipality)
                .Select(munGroup => new MunicipalityWardInfo
                {
                    MunicipalityId = munGroup.Key.MunicipalityId,
                    MunicipalityName = munGroup.Key.MunicipalityNameEn,
                    WardIdNumbers = munGroup
                        .Select(w => new WardIdNumber
                        {
                            WardId = w.WardId,
                            WardNumber = w.WardNumber
                        })
                        .OrderBy(w => w.WardNumber)
                        .ToList()
                })
                .ToList()
        };
    }

}