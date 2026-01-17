using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public class WardInfo
{
    public int WardId { get; set; }
    public string WardName { get; set; }
    public int WardNumber { get; set; }
    public int MunicipalityId { get; set; }
}