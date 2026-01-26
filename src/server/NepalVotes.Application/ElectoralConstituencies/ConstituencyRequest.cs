using System.ComponentModel.DataAnnotations;

namespace NepalVotes.Application.ElectoralConstituencies;

public record AddConstituencyRequest(
    [Required]
    string ConstituencyName,
    List<int>? WardIds = null
);

public record UpdateConstituencyRequest(
    int ConstituencyId,
    string ConstituencyName,
    List<int> WardIds
);

public record ReassignWardRequest(
    int WardId,
    int ConstituencyId);
