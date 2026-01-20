namespace NepalVotes.Application.ElectoralConstituencies;

public class WardConflictInfo
{
    public int ConstituencyId { get; set; }
    public string ConstituencyName { get; set; } = string.Empty;

    public int ProvinceId { get; set; }
    public int DistrictId { get; set; }
    public int MunicipalityId { get; set; }

    public List<int> WardIds { get; set; } = new();
}
