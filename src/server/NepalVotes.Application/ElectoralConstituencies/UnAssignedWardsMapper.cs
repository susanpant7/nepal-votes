namespace NepalVotes.Application.ElectoralConstituencies;

public class UnassignedWard
{
    public int WardId { get; set; }
    public int WardNumber { get; set; }
    public string WardName { get; set; } = string.Empty;
}
public class MunicipalityWithUnassignedWards
{
    public int MunicipalityId { get; set; }
    public string MunicipalityName { get; set; } = string.Empty;
    public List<UnassignedWard> Wards { get; set; } = [];
}
public class DistrictWithUnassignedWards
{
    public int DistrictId { get; set; }
    public string DistrictName { get; set; } = string.Empty;
    public List<MunicipalityWithUnassignedWards> Municipalities { get; set; } = [];
}

public class ProvinceWithUnassignedWards
{
    public int ProvinceId { get; set; }
    public string ProvinceName { get; set; } = string.Empty;
    public List<DistrictWithUnassignedWards> Districts { get; set; } = [];
}
