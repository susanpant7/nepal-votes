using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public static class ProvinceMapper
{
    public static ProvinceInfo ToInfo(this Province province)
    {
        return new ProvinceInfo
        {
            ProvinceId = province.ProvinceId,
            ProvinceName = province.ProvinceName
        };
    }
}
