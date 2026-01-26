using NepalVotes.Domain.ElectoralConstituencies;

namespace NepalVotes.Application.ElectoralConstituencies;

public class ConstituencyDropdown
{
    public int ConstituencyId { get; set; }
    public string ConstituencyName { get; set; } =  string.Empty;
}

public static class ConstituencyDropdownMapper
{
    public static ConstituencyDropdown ToDropdownItems(this Constituency constituency)
    {
        return new ConstituencyDropdown
        {
            ConstituencyId = constituency.ConstituencyId,
            ConstituencyName = constituency.ConstituencyName,
        };
    }
}

// for the constituency list page
public class ConstituencyListItem
{
    public int ConstituencyId { get; set; }
    public string ConstituencyName { get; set; } = string.Empty;
    public int ProvinceId { get; set; }
    public int DistrictId { get; set; }
    public int TotalWards { get; set; }  
    public List<MunicipalityNameAndWardNumbers> MunicipalityNameAndWardNumbers { get; set; } = [];
}

public class MunicipalityNameAndWardNumbers
{
    public string MunicipalityName { get; set; } = string.Empty;
    public string WardNumbers { get; set; } = string.Empty;
}

// public class MunicipalityWithWardsInfo
// {
//     public int MunicipalityId { get; set; }
//     public string MunicipalityName { get; set; } = string.Empty;
//     public List<WardNameAndNumber> WardNameAndNumbers { get; set; } = [];
// }
//
// public class WardNameAndNumber
// {
//     public int WardId { get; set; }
//     public int WardNumber { get; set; }
//     public string WardName { get; set; } = string.Empty;
// }

public static class ConstituencyListItemMapper
{
    public static ConstituencyListItem ToListItem(this Constituency constituency)
    {
        var wards = constituency.Wards ?? [];

        var firstWard = wards.FirstOrDefault();
        var district = firstWard?.Municipality?.District;
        var province = district?.Province;
        return new ConstituencyListItem
        {
            ConstituencyId = constituency.ConstituencyId,
            ConstituencyName = constituency.ConstituencyName,
            ProvinceId = province?.ProvinceId ?? 0,
            DistrictId = district?.DistrictId ?? 0,
            TotalWards = wards.Count,

            MunicipalityNameAndWardNumbers = wards
                .GroupBy(w => w.Municipality.MunicipalityName)
                .Select(g => new MunicipalityNameAndWardNumbers
                {
                    MunicipalityName = g.Key,
                    WardNumbers = string.Join(
                        ", ",
                        g.OrderBy(w => w.WardNumber)
                            .Select(w => w.WardNumber))
                })
                .ToList()
        };
    }

}