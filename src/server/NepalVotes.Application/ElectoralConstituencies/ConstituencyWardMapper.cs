using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralConstituencies;

public class WardWithConstituency
{
    public int WardId { get; set; }
    public string WardNumber { get; set; } = string.Empty;
    public int? AssignedConstituencyId { get; set; }
    public string? AssignedConstituencyName { get; set; }
}

public static class ConstituencyWardMapper
{
    public static WardWithConstituency ToWardWithConstituency(this Ward ward)
    {
        return new WardWithConstituency
        {
            WardId = ward.WardId,
            WardNumber = ward.WardNumber.ToString(),
            AssignedConstituencyId = ward.ConstituencyId,
            AssignedConstituencyName = ward.Constituency?.ConstituencyName
        };
    }
}
