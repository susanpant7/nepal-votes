namespace NepalVotes.Application.ElectoralConstituencies;

public record AddConstituencyRequest(
    string ConstituencyName,
    List<int> WardIds
);

public record UpdateConstituencyRequest(
    int ConstituencyId,
    string ConstituencyName,
    List<int> WardIds
);
