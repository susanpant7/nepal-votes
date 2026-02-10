namespace NepalVotes.Engine.Models;

public class ProvinceJson
{
    public int id { get; set; }
    public string name { get; set; }
    public Dictionary<string,DistrictJson> districts { get; set; }
}

public class DistrictJson
{
    public int id { get; set; }
    public string name { get; set; }
    public Dictionary<string, MunicipalityJson> municipalities { get; set; }
}

public class MunicipalityJson
{
    public int id { get; set; }
    public string name { get; set; }
    public int category_id { get; set; }   // MunicipalityType
    public List<int> wards { get; set; }
}
