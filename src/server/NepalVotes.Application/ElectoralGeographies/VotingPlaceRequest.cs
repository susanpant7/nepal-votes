namespace NepalVotes.Application.ElectoralGeographies;

public record AddVotingPlaceRequest(string VotingPlaceAddress, int WardId);
public record UpdateVotingPlaceRequest(int VotingPlaceId, string VotingPlaceAddress, int WardId);