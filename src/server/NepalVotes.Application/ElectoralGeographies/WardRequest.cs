namespace NepalVotes.Application.ElectoralGeographies;

public record AddWardRequest(string WardName, int WardNumber, int MunicipalityId);
public record UpdateWardRequest(int WardId, string WardName, int WardNumber, int MunicipalityId);
