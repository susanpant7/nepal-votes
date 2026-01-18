using System.ComponentModel.DataAnnotations;

namespace NepalVotes.Application.ElectoralGeographies;

public record ProvinceNameRequest(
    [Required(ErrorMessage = "Province name is required")]
    [MinLength(1, ErrorMessage = "Province name cannot be empty")]
    string ProvinceName
);

public record AddProvinceRequest(string ProvinceName) 
    : ProvinceNameRequest(ProvinceName);

public record UpdateProvinceRequest(int ProvinceId, string ProvinceName) 
    : ProvinceNameRequest(ProvinceName);