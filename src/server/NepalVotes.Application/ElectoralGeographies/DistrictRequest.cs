namespace NepalVotes.Application.ElectoralGeographies;

public record AddDistrictRequest(string DistrictName, int ProvinceId);
public record UpdateDistrictRequest(int DistrictId, string DistrictName, int ProvinceId);
