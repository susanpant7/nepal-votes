using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public static class DistrictMapper
{
    public static DistrictInfo ToInfo(this District district)
    {
        return new DistrictInfo
        {
            DistrictId = district.DistrictId,
            DistrictName = district.DistrictName,
            ProvinceId = district.ProvinceId
        };
    }
}
