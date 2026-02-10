using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public class MunicipalityService(IMunicipalityRepository repo, IWardRepository wardRepository,
    IUnitOfWork unitOfWork) : IMunicipalityService
{
    public async Task<ApiResponse<IEnumerable<MunicipalityInfo>>> GetByDistrictIdAsync(int districtId)
    {
        var municipalities = await repo.GetByDistrictIdAsync(districtId);
        var municipalitiesInfo = municipalities.Select(m => m.ToInfo()).ToList();

        return municipalitiesInfo.Count == 0
            ? ApiResponse<IEnumerable<MunicipalityInfo>>.SuccessResponse(municipalitiesInfo, "No municipalities found for this district.")
            : ApiResponse<IEnumerable<MunicipalityInfo>>.SuccessResponse(municipalitiesInfo);
    }

    public async Task<ApiResponse<MunicipalityInfo?>> GetByIdAsync(int id)
    {
        var municipality = await repo.GetByIdAsync(id);
        return municipality == null
            ? ApiResponse<MunicipalityInfo?>.SuccessResponse(null, "Municipality not found.")
            : ApiResponse<MunicipalityInfo?>.SuccessResponse(municipality.ToInfo());
    }

    public async Task<ApiResponse<bool>> AddAsync(AddMunicipalityRequest request)
    {
        if (await repo.ExistsByNameAsync(request.MunicipalityName, request.DistrictId))
            return ApiResponse<bool>.ErrorResponse("Municipality name must be unique in the district.");

        var entity = new Municipality
        {
            MunicipalityNameEn = request.MunicipalityName,
            MunicipalityType = request.MunicipalityType,
            DistrictId = request.DistrictId
        };

        await repo.AddAsync(entity);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "Municipality added successfully.");
    }

    public async Task<ApiResponse<bool>> UpdateAsync(UpdateMunicipalityRequest request)
    {
        if (await repo.ExistsByNameAsync(request.MunicipalityName, request.DistrictId, request.MunicipalityId))
            return ApiResponse<bool>.ErrorResponse("Municipality name must be unique in the district.");

        var entity = new Municipality
        {
            MunicipalityId = request.MunicipalityId,
            MunicipalityNameEn = request.MunicipalityName,
            MunicipalityType = request.MunicipalityType,
            DistrictId = request.DistrictId
        };

        await repo.UpdateAsync(entity);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "Municipality updated successfully.");
    }
    
    public async Task<ApiResponse<bool>> DeleteAsync(int municipalityId)
    {
        if (await wardRepository.AnyByMunicipalityIdAsync(municipalityId))
            return ApiResponse<bool>.ErrorResponse(
                "Municipality cannot be deleted because it has wards.");

        var municipality = await repo.GetByIdAsync(municipalityId);
        if (municipality == null)
            return ApiResponse<bool>.ErrorResponse("Municipality not found.");

        await repo.DeleteAsync(municipality);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "Municipality deleted successfully.");
    }

}
