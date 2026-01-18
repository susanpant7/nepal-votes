using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.ElectoralGeographies;

public interface IProvinceService
{
    Task<ApiResponse<IEnumerable<ProvinceInfo>>> GetAllAsync();
    Task<ApiResponse<ProvinceInfo?>> GetByIdAsync(int id);
    Task<ApiResponse<bool>> AddAsync(AddProvinceRequest request);
    Task<ApiResponse<bool>> UpdateAsync(UpdateProvinceRequest request);
    Task<ApiResponse<bool>> DeleteAsync(int provinceId);
}