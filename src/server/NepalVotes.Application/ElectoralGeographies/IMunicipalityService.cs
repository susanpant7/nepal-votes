using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.ElectoralGeographies;

public interface IMunicipalityService
{
    Task<ApiResponse<IEnumerable<MunicipalityInfo>>> GetByDistrictIdAsync(int districtId);
    Task<ApiResponse<MunicipalityInfo?>> GetByIdAsync(int id);
    Task<ApiResponse<bool>> AddAsync(AddMunicipalityRequest request);
    Task<ApiResponse<bool>> UpdateAsync(UpdateMunicipalityRequest request);
}