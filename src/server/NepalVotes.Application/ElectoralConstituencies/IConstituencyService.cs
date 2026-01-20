using NepalVotes.Application.ResponseHelpers;

namespace NepalVotes.Application.ElectoralConstituencies;

public interface IConstituencyService
{
    Task<ApiResponse<IEnumerable<ConstituencyInfo>>> GetAllAsync();
    Task<ApiResponse<List<WardConflictInfo>>> AddAsync(AddConstituencyRequest request);
    Task<ApiResponse<List<WardConflictInfo>>> UpdateAsync(UpdateConstituencyRequest request);
    Task<ApiResponse<bool>> DeleteAsync(int id);
}
