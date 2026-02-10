using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public class ProvinceService(IProvinceRepository repo, IDistrictRepository districtRepository,
    IUnitOfWork unitOfWork) : IProvinceService
{
    public async Task<ApiResponse<IEnumerable<ProvinceInfo>>> GetAllAsync()
    {
        var provinces = await repo.GetAllAsync();
        var provincesInfo = provinces.Select(p => p.ToInfo()).ToList();

        return provincesInfo.Count == 0
            ? ApiResponse<IEnumerable<ProvinceInfo>>.SuccessResponse(provincesInfo, "No provinces found.")
            : ApiResponse<IEnumerable<ProvinceInfo>>.SuccessResponse(provincesInfo);
    }

    public async Task<ApiResponse<ProvinceInfo?>> GetByIdAsync(int id)
    {
        var province = await repo.GetByIdAsync(id);
        return province == null
            ? ApiResponse<ProvinceInfo?>.SuccessResponse(null, "Province not found.")
            : ApiResponse<ProvinceInfo?>.SuccessResponse(province.ToInfo());
    }

    public async Task<ApiResponse<bool>> AddAsync(AddProvinceRequest request)
    {
        if (await repo.ExistsByNameAsync(request.ProvinceName))
            return ApiResponse<bool>.ErrorResponse("Province name must be unique.");

        var entity = new Province
        {
            ProvinceNameEn = request.ProvinceName
        };

        await repo.AddAsync(entity);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "Province added successfully.");
    }

    public async Task<ApiResponse<bool>> UpdateAsync(UpdateProvinceRequest request)
    {
        if (await repo.ExistsByNameAsync(request.ProvinceName, request.ProvinceId))
            return ApiResponse<bool>.ErrorResponse("Province name must be unique.");

        var entity = new Province
        {
            ProvinceId = request.ProvinceId,
            ProvinceNameEn = request.ProvinceName
        };

        await repo.UpdateAsync(entity);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "Province updated successfully.");
    }
    
    public async Task<ApiResponse<bool>> DeleteAsync(int provinceId)
    {
        if (await districtRepository.AnyByProvinceIdAsync(provinceId))
            return ApiResponse<bool>.ErrorResponse(
                "Province cannot be deleted because it has districts.");

        var province = await repo.GetByIdAsync(provinceId);
        if (province == null)
            return ApiResponse<bool>.ErrorResponse("Province not found.");

        await repo.DeleteAsync(province);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "Province deleted successfully.");
    }

}




