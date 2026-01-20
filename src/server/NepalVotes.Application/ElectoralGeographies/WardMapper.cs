using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public static class WardMapper
{
    private static WardInfo Map(Ward ward)
    {
        return new WardInfo
        {
            WardId = ward.WardId,
            WardName = ward.WardName,
            WardNumber = ward.WardNumber
        };
    }
    
    public static WardInfo ToWardInfoWithMunicipalityId(this Ward ward)
    {
        return Map(ward);
    }
    
    public static WardInfo ToWardInfo(this Ward ward)
    {
        var info = Map(ward);
        info.MunicipalityId = ward.MunicipalityId;
        return info;
    }
}
