using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public interface IWardService
{
    Task<ApiResponse<IEnumerable<WardInfo>>> GetByMunicipalityIdAsync(int municipalityId);
    Task<ApiResponse<WardInfo?>> GetByIdAsync(int id);
    Task<ApiResponse<bool>> AddAsync(AddWardRequest request);
    Task<ApiResponse<bool>> UpdateAsync(UpdateWardRequest request);
    Task<ApiResponse<bool>> DeleteAsync(int wardId);
    Task<ApiResponse<IEnumerable<WardInfo>>> GetByIdsAsync(IEnumerable<int> wardIds);

}