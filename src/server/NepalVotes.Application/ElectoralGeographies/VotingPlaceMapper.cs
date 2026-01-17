using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public static class VotingPlaceMapper
{
    public static VotingPlaceInfo ToInfo(this VotingPlace votingPlace)
    {
        return new VotingPlaceInfo
        {
            VotingPlaceId = votingPlace.VotingPlaceId,
            VotingPlaceAddress = votingPlace.VotingPlaceAddress,
            WardId = votingPlace.WardId
        };
    }
}
