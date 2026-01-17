using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public record AddMunicipalityRequest(string MunicipalityName, MunicipalityType MunicipalityType, int DistrictId);
public record UpdateMunicipalityRequest(int MunicipalityId, string MunicipalityName, MunicipalityType MunicipalityType, int DistrictId);
