using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public class MunicipalityInfo
{
    public int MunicipalityId { get; set; }
    public string MunicipalityName { get; set; }
    public MunicipalityType MunicipalityType { get; set; }
    public int DistrictId { get; set; }
}