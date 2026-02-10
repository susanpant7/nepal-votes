using NepalVotes.Domain.Common;

namespace NepalVotes.Domain.ElectoralGeographies;

public class Province : BaseAuditableEntity
{
    public int ProvinceId { get; set; }
    public string ProvinceNameEn { get; set; }
    public string ProvinceNameNp { get; set; }

    public ICollection<District> Districts { get; set; } = new List<District>();
}