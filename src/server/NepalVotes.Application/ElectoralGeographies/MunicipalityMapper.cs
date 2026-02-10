using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public static class MunicipalityMapper
{
    public static MunicipalityInfo ToInfo(this Municipality municipality)
    {
        return new MunicipalityInfo
        {
            MunicipalityId = municipality.MunicipalityId,
            MunicipalityName = municipality.MunicipalityNameEn,
            MunicipalityType = municipality.MunicipalityType,
            DistrictId = municipality.DistrictId
        };
    }
}
