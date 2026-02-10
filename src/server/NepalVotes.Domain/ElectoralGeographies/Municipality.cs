using NepalVotes.Domain.Common;

namespace NepalVotes.Domain.ElectoralGeographies;

public class Municipality : BaseAuditableEntity
{
    public int MunicipalityId { get; set; }
    public string MunicipalityNameEn { get; set; }
    public MunicipalityType MunicipalityType { get; set; }
    
    public int DistrictId { get; set; }
    public District District { get; set; }

    public ICollection<Ward> Wards { get; set; } = new List<Ward>();
}