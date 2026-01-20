using NepalVotes.Domain.ElectoralConstituencies;

namespace NepalVotes.Application.ElectoralConstituencies;

public class ConstituencyInfo
{
    public int ConstituencyId { get; set; }
    public string ConstituencyName { get; set; }
    public List<int> WardIds { get; set; } = new();
}

public static class ConstituencyMapper
{
    public static ConstituencyInfo ToInfo(this Constituency constituency)
    {
        return new ConstituencyInfo
        {
            ConstituencyId = constituency.ConstituencyId,
            ConstituencyName = constituency.ConstituencyName,
            WardIds = constituency.Wards?.Select(w => w.WardId).ToList() ?? []
        };
    }
}