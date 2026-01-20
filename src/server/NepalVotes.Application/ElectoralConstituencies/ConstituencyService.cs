using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralConstituencies;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralConstituencies;

public class ConstituencyService(
    IConstituencyRepository repo,
    IUnitOfWork unitOfWork,
    IWardRepository wardRepo)
    : IConstituencyService
{
    public async Task<ApiResponse<IEnumerable<ConstituencyInfo>>> GetAllAsync()
    {
        var constituencies = await repo.GetAllAsync();
        var info = constituencies.Select(c => c.ToInfo()).ToList();

        return info.Count == 0
            ? ApiResponse<IEnumerable<ConstituencyInfo>>.SuccessResponse(info, "No constituencies found.")
            : ApiResponse<IEnumerable<ConstituencyInfo>>.SuccessResponse(info);
    }

    public async Task<ApiResponse<List<WardConflictInfo>>> AddAsync(AddConstituencyRequest request)
    {
        var conflictingWards = await GetWardConflictsAsync(request.WardIds);

        if (conflictingWards.Count != 0)
        {
            return ApiResponse<List<WardConflictInfo>>.SuccessResponse(conflictingWards,
                "Cannot add constituency. Some wards are already assigned.", 500
            );
        }

        var wards = await wardRepo.GetByIdsAsync(request.WardIds);

        var constituency = new Constituency
        {
            ConstituencyName = request.ConstituencyName,
            Wards = wards.ToList()
        };

        await repo.AddAsync(constituency);
        await unitOfWork.SaveChangesAsync();

        return ApiResponse<List<WardConflictInfo>>.SuccessResponse([],"Constituency created successfully.");
    }


    public async Task<ApiResponse<List<WardConflictInfo>>> UpdateAsync(UpdateConstituencyRequest request)
    {
        var constituency = await repo.GetByIdAsync(request.ConstituencyId);
        if (constituency == null)
            return ApiResponse<List<WardConflictInfo>>.ErrorResponse("Constituency not found.");
        
        var conflictingWards = await GetWardConflictsAsync(request.WardIds, request.ConstituencyId);

        if (conflictingWards.Count != 0)
        {
            return ApiResponse<List<WardConflictInfo>>.SuccessResponse(conflictingWards,
                "Cannot add constituency. Some wards are already assigned.",
                500
            );
        }
        
        var wards = await wardRepo.GetByIdsAsync(request.WardIds);

        constituency.ConstituencyName = request.ConstituencyName;
        constituency.Wards = wards.ToList();

        await repo.UpdateAsync(constituency);
        await unitOfWork.SaveChangesAsync();

        return ApiResponse<List<WardConflictInfo>>.SuccessResponse([], "Constituency updated successfully.");
    }

    
    private async Task<List<WardConflictInfo>> GetWardConflictsAsync(List<int> wardIds, int? excludeConstituencyId = null)
    {
        var constituencies = await repo.GetConstituencyGeographiesByWardIdsAsync(wardIds);

        if (excludeConstituencyId.HasValue)
        {
            constituencies = constituencies
                .Where(c => c.ConstituencyId != excludeConstituencyId.Value)
                .ToList();
        }

        var conflicts = new List<WardConflictInfo>();

        foreach (var constituency in constituencies)
        {
            var conflictingWards = constituency.Wards
                .Where(w => wardIds.Contains(w.WardId))
                .ToList();

            if (conflictingWards.Count == 0) continue;

            var firstWard = conflictingWards.First();
            var municipality = firstWard.Municipality;
            var district = municipality.District;
            var province = district.Province;

            conflicts.Add(new WardConflictInfo
            {
                ConstituencyId = constituency.ConstituencyId,
                ConstituencyName = constituency.ConstituencyName,
                ProvinceId = province.ProvinceId,
                DistrictId = district.DistrictId,
                MunicipalityId = municipality.MunicipalityId,
                WardIds = conflictingWards.Select(w => w.WardId).ToList()
            });
        }

        return conflicts;
    }



    public async Task<ApiResponse<bool>> DeleteAsync(int id)
    {
        var constituency = await repo.GetByIdAsync(id);
        if (constituency == null)
            return ApiResponse<bool>.ErrorResponse("Constituency not found.");

        await repo.DeleteAsync(constituency);
        await unitOfWork.SaveChangesAsync();

        return ApiResponse<bool>.SuccessResponse(true, "Constituency deleted successfully.");
    }
}
