using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public class DistrictService(IDistrictRepository repo, IMunicipalityRepository municipalityRepository,
    IUnitOfWork unitOfWork) : IDistrictService
{
    public async Task<ApiResponse<IEnumerable<DistrictInfo>>> GetByProvinceAsync(int provinceId)
    {
        var districts = await repo.GetByProvinceIdAsync(provinceId);
        var districtsInfo = districts.Select(d => d.ToInfo()).ToList();

        return districtsInfo.Count == 0
            ? ApiResponse<IEnumerable<DistrictInfo>>.SuccessResponse(districtsInfo, "No districts found for this province.")
            : ApiResponse<IEnumerable<DistrictInfo>>.SuccessResponse(districtsInfo);
    }

    public async Task<ApiResponse<IEnumerable<DistrictInfo>>> GetAllAsync()
    {
        var districts = await repo.GetAllAsync();
        var districtsInfo = districts.Select(d => d.ToInfo()).ToList();

        return ApiResponse<IEnumerable<DistrictInfo>>.SuccessResponse(districtsInfo);
    }

    // GET by Id
    public async Task<ApiResponse<DistrictInfo?>> GetByIdAsync(int id)
    {
        var district = await repo.GetByIdAsync(id);
        return district == null
            ? ApiResponse<DistrictInfo?>.SuccessResponse(null, "District not found.")
            : ApiResponse<DistrictInfo?>.SuccessResponse(district.ToInfo());
    }

    // ADD
    public async Task<ApiResponse<bool>> AddAsync(AddDistrictRequest request)
    {
        if (await repo.ExistsByNameAsync(request.DistrictName, request.ProvinceId))
            return ApiResponse<bool>.ErrorResponse("District name must be unique in the province.");

        var entity = new District
        {
            DistrictNameEn = request.DistrictName,
            ProvinceId = request.ProvinceId
        };

        await repo.AddAsync(entity);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "District added successfully.");
    }

    // UPDATE
    public async Task<ApiResponse<bool>> UpdateAsync(UpdateDistrictRequest request)
    {
        if (await repo.ExistsByNameAsync(request.DistrictName, request.ProvinceId, request.DistrictId))
            return ApiResponse<bool>.ErrorResponse("District name must be unique in the province.");

        var entity = new District
        {
            DistrictId = request.DistrictId,
            DistrictNameEn = request.DistrictName,
            ProvinceId = request.ProvinceId
        };

        await repo.UpdateAsync(entity);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "District updated successfully.");
    }
    
    public async Task<ApiResponse<bool>> DeleteAsync(int districtId)
    {
        if (await municipalityRepository.AnyByDistrictIdAsync(districtId))
            return ApiResponse<bool>.ErrorResponse(
                "District cannot be deleted because it has municipalities.");

        var district = await repo.GetByIdAsync(districtId);
        if (district == null)
            return ApiResponse<bool>.ErrorResponse("District not found.");

        await repo.DeleteAsync(district);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "District deleted successfully.");
    }
}
