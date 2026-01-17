namespace NepalVotes.Application.ElectoralGeographies;

public record AddProvinceRequest(string ProvinceName);
public record UpdateProvinceRequest(int ProvinceId, string ProvinceName);