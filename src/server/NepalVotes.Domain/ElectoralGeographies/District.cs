using NepalVotes.Domain.Common;

namespace NepalVotes.Domain.ElectoralGeographies;

public class District : BaseAuditableEntity
{
    public int DistrictId { get; set; }
    public string DistrictName { get; set; }

    public int ProvinceId { get; set; }
    public Province Province { get; set; }

    public ICollection<Municipality> Municipalities { get; set; } = new List<Municipality>();
}