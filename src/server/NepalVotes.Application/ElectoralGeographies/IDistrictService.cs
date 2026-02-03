using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.ElectoralGeographies;

public interface IDistrictService
{
    Task<ApiResponse<IEnumerable<DistrictInfo>>> GetByProvinceAsync(int provinceId);
    Task<ApiResponse<IEnumerable<DistrictInfo>>> GetAllAsync();
    Task<ApiResponse<DistrictInfo?>> GetByIdAsync(int id);
    Task<ApiResponse<bool>> AddAsync(AddDistrictRequest request);
    Task<ApiResponse<bool>> UpdateAsync(UpdateDistrictRequest request);
    Task<ApiResponse<bool>> DeleteAsync(int districtId);
}