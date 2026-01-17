using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.ElectoralGeographies;

public interface IWardService
{
    Task<ApiResponse<IEnumerable<WardInfo>>> GetByMunicipalityIdAsync(int municipalityId);
    Task<ApiResponse<WardInfo?>> GetByIdAsync(int id);
    Task<ApiResponse<bool>> AddAsync(AddWardRequest request);
    Task<ApiResponse<bool>> UpdateAsync(UpdateWardRequest request);
}