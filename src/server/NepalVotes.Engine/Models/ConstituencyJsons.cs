namespace NepalVotes.Engine.Models;

public class DistrictJsonModel
{
    public string DistrictName { get; set; }
    public List<ConstituencyJsonModel> Constituencies { get; set; }
}

public class ConstituencyJsonModel
{
    public int ConstituencyNumber { get; set; }
    public List<MunicipalityWardJsonModel> MunicipalityAndWards { get; set; }
}

public class MunicipalityWardJsonModel
{
    public string MunicipalityName { get; set; }
    public bool AllWards { get; set; }
    public List<int> Wards { get; set; } = new List<int>();
}