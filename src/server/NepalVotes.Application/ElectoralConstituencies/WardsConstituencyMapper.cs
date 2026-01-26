namespace NepalVotes.Application.ElectoralConstituencies;

public class WardWithConstituencyDetails
{
    public int WardId { get; set; }
    public int WardNumber { get; set; }
    public string WardName { get; set; } = string.Empty;
    public int? ConstituencyId { get; set; }
    public string? ConstituencyName { get; set; }
}
public class MunicipalityWithWardsDetails
{
    public int MunicipalityId { get; set; }
    public string MunicipalityName { get; set; } = string.Empty;
    public List<WardWithConstituencyDetails> Wards { get; set; } = [];
}
public class DistrictWithMunicipalitiesDetails
{
    public int DistrictId { get; set; }
    public string DistrictName { get; set; } = string.Empty;
    public List<MunicipalityWithWardsDetails> Municipalities { get; set; } = [];
}

public class ProvinceWithDistrictsDetails
{
    public int ProvinceId { get; set; }
    public string ProvinceName { get; set; } = string.Empty;
    public List<DistrictWithMunicipalitiesDetails> Districts { get; set; } = [];
}
