namespace NepalVotes.Engine.Models;

public class ProvinceEn
{
    public int id { get; set; }
    public string name { get; set; }
    public Dictionary<string, DistrictEn> districts { get; set; }
}

public class DistrictEn
{
    public int id { get; set; }
    public string name { get; set; }
    public Dictionary<string, MunicipalityEn> municipalities { get; set; }
}

public class MunicipalityEn
{
    public int id { get; set; }
    public string name { get; set; }
    public int district_id { get; set; }
    public int category_id { get; set; }
    public List<int> wards { get; set; } // Integers: [1, 2, 3]
}

public class ProvinceNp
{
    public int id { get; set; }
    public string name { get; set; }
    public Dictionary<string, DistrictNp> districts { get; set; }
}

public class DistrictNp
{
    public int id { get; set; }
    public string name { get; set; }
    public Dictionary<string, MunicipalityNp> municipalities { get; set; }
}

public class MunicipalityNp
{
    public int id { get; set; }
    public string name { get; set; }
    public int district_id { get; set; }
    public int category_id { get; set; }
    public List<string> wards { get; set; } // Strings: ["१", "२", "३"]
}
