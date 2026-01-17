using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public static class WardMapper
{
    public static WardInfo ToInfo(this Ward ward)
    {
        return new WardInfo
        {
            WardId = ward.WardId,
            WardName = ward.WardName,
            WardNumber = ward.WardNumber,
            MunicipalityId = ward.MunicipalityId
        };
    }
}
