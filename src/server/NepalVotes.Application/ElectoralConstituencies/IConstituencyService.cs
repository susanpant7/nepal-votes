using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.ElectoralConstituencies;

public interface IConstituencyService
{
    // Task<ApiResponse<IEnumerable<ConstituencyListItem>>> GetAllAsync();
    Task<ApiResponse<List<ConstituencyDropdown>>> GetDropdownAsync();
    Task<ApiResponse<IEnumerable<ConstituencyListItem>>> GetByAndDistrictAsync(int districtId);
    Task<ApiResponse<ConstituencyDetail>> GetConstituencyDetailAsync(int constituencyId);
    Task<ApiResponse<int>> AddAsync(AddConstituencyRequest request);
    Task<ApiResponse<int>> UpdateAsync(UpdateConstituencyRequest request);
    Task<ApiResponse<bool>> DeleteAsync(int id);
    Task<ApiResponse<bool>> ReassignWardAsync(int wardId, int constituencyId);
    Task<ApiResponse<List<WardWithConstituency>>> GetWardsWithConstituencyByMunicipalityAsync(int municipalityId);
    Task<ApiResponse<List<ProvinceWithUnassignedWards>>> GetUnassignedWardsAsync();
}
