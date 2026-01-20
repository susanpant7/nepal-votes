using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public class WardService(IWardRepository repo, IVotingPlaceRepository votingPlaceRepository,
    IUnitOfWork unitOfWork) : IWardService
{
    public async Task<ApiResponse<IEnumerable<WardInfo>>> GetByMunicipalityIdAsync(int municipalityId)
    {
        var wards = await repo.GetByMunicipalityIdAsync(municipalityId);
        var wardsInfo = wards.Select(w => w.ToWardInfoWithMunicipalityId()).ToList();

        return wardsInfo.Count == 0
            ? ApiResponse<IEnumerable<WardInfo>>.SuccessResponse(wardsInfo, "No wards found for this municipality.")
            : ApiResponse<IEnumerable<WardInfo>>.SuccessResponse(wardsInfo);
    }

    public async Task<ApiResponse<WardInfo?>> GetByIdAsync(int id)
    {
        var ward = await repo.GetByIdAsync(id);
        return ward == null
            ? ApiResponse<WardInfo?>.SuccessResponse(null, "Ward not found.")
            : ApiResponse<WardInfo?>.SuccessResponse(ward.ToWardInfoWithMunicipalityId());
    }

    public async Task<ApiResponse<bool>> AddAsync(AddWardRequest request)
    {
        if (await repo.ExistsByNameAsync(request.WardName, request.MunicipalityId))
            return ApiResponse<bool>.ErrorResponse("Ward name must be unique in the municipality.");

        var entity = new Ward
        {
            WardName = request.WardName,
            WardNumber = request.WardNumber,
            MunicipalityId = request.MunicipalityId
        };

        await repo.AddAsync(entity);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "Ward added successfully.");
    }

    public async Task<ApiResponse<bool>> UpdateAsync(UpdateWardRequest request)
    {
        if (await repo.ExistsByNameAsync(request.WardName, request.MunicipalityId, request.WardId))
            return ApiResponse<bool>.ErrorResponse("Ward name must be unique in the municipality.");

        var entity = new Ward
        {
            WardId = request.WardId,
            WardName = request.WardName,
            WardNumber = request.WardNumber,
            MunicipalityId = request.MunicipalityId
        };

        await repo.UpdateAsync(entity);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "Ward updated successfully.");
    }

    public async Task<ApiResponse<bool>> DeleteAsync(int wardId)
    {
        if (await votingPlaceRepository.AnyByWardIdAsync(wardId))
            return ApiResponse<bool>.ErrorResponse(
                "Ward cannot be deleted because it has voting places.");

        var ward = await repo.GetByIdAsync(wardId);
        if (ward == null)
            return ApiResponse<bool>.ErrorResponse("Ward not found.");

        await repo.DeleteAsync(ward);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "Ward deleted successfully.");
    }
    
    public async Task<ApiResponse<IEnumerable<WardInfo>>> GetByIdsAsync(IEnumerable<int> wardIds)
    {
        var wards = await repo.GetByIdsAsync(wardIds);
        var wardsInfo = wards.Select(w => w.ToWardInfo()).ToList();
        return ApiResponse<IEnumerable<WardInfo>>.SuccessResponse(wardsInfo);
    }

}
