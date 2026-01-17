using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public class MunicipalityService(IMunicipalityRepository repo, IUnitOfWork unitOfWork) : IMunicipalityService
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
        MunicipalityName = request.MunicipalityName,
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
        MunicipalityName = request.MunicipalityName,
        MunicipalityType = request.MunicipalityType,
        DistrictId = request.DistrictId
    };

    await repo.UpdateAsync(entity);
    await unitOfWork.SaveChangesAsync();
    
    return ApiResponse<bool>.SuccessResponse(true, "Municipality updated successfully.");
}

}
