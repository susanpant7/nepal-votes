using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralConstituencies;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralConstituencies;

public class ConstituencyService(
    IConstituencyRepository repo,
    IConstituencyQueryRepository queryRepository,
    IUnitOfWork unitOfWork,
    IWardRepository wardRepo)
    : IConstituencyService
{
    // public async Task<ApiResponse<IEnumerable<ConstituencyListItem>>> GetAllAsync()
    // {
    //     var constituencies = await repo.GetAllAsync();
    //
    //     var info = constituencies
    //         .Select(c => c.ToListItem())
    //         .ToList();
    //
    //     return info.Count == 0
    //         ? ApiResponse<IEnumerable<ConstituencyListItem>>.SuccessResponse(info, "No constituencies found.")
    //         : ApiResponse<IEnumerable<ConstituencyListItem>>.SuccessResponse(info);
    // }

    public async Task<ApiResponse<List<ConstituencyDropdown>>> GetDropdownAsync()
    {
        var constituencies = await repo.GetAllConstituenciesAsync();

        return constituencies.Count == 0
            ? ApiResponse<List<ConstituencyDropdown>>.ErrorResponse("No constituencies found.")
            : ApiResponse<List<ConstituencyDropdown>>.SuccessResponse(constituencies.Select(x=> x.ToDropdownItems()).ToList());
    }

    public async Task<ApiResponse<List<ConstituencyFilterItem>>> GetAllWithLocationAsync()
    {
        var items = await queryRepository.GetAllWithLocationAsync();
        return items.Count == 0
            ? ApiResponse<List<ConstituencyFilterItem>>.ErrorResponse("No constituencies found.")
            : ApiResponse<List<ConstituencyFilterItem>>.SuccessResponse(items);
    }

    public async Task<ApiResponse<IEnumerable<ConstituencyListItem>>> GetByAndDistrictAsync(int districtId)
    {
        var constituenciesInfo = await queryRepository.GetByDistrictAsync(districtId);

        return constituenciesInfo.Count == 0
            ? ApiResponse<IEnumerable<ConstituencyListItem>>
                .SuccessResponse(constituenciesInfo, "No constituencies found.")
            : ApiResponse<IEnumerable<ConstituencyListItem>>
                .SuccessResponse(constituenciesInfo);
    }
    
    public async Task<ApiResponse<ConstituencyDetail>> GetConstituencyDetailAsync(int constituencyId)
    {
        var constituency = await repo.GetAllGeographiesByIdAsync(constituencyId);
        return constituency == null 
            ? ApiResponse<ConstituencyDetail>.ErrorResponse("No constituency found.") 
            : ApiResponse<ConstituencyDetail>.SuccessResponse(constituency.ToDetail());
    }

    public async Task<ApiResponse<List<WardWithConstituency>>> GetWardsWithConstituencyByMunicipalityAsync(int municipalityId)
    {
        var wards = await wardRepo.GetWardsWithConstituencyByMunicipalityIdAsync(municipalityId);
        if (wards.Count == 0)
        {
            return ApiResponse<List<WardWithConstituency>>
                .SuccessResponse([], "No wards found for this municipality");
        }
        var wardsWithConstituencies = wards.Select(w => w.ToWardWithConstituency()).ToList();
        return ApiResponse<List<WardWithConstituency>>.SuccessResponse(wardsWithConstituencies);
    }

    public async Task<ApiResponse<List<ProvinceWithDistrictsDetails>>> GetUnassignedWardsAsync()
    {
        var data = await queryRepository.GetUnassignedWardsGroupedAsync();

        return data.Count == 0
            ? ApiResponse<List<ProvinceWithDistrictsDetails>>.ErrorResponse("No unassigned wards found.")
            : ApiResponse<List<ProvinceWithDistrictsDetails>>.SuccessResponse(data);
    }

    public async Task<ApiResponse<bool>> ReassignWardAsync(int wardId, int constituencyId)
    {
        var ward = await wardRepo.GetByIdAsync(wardId);
        if (ward == null)
            return ApiResponse<bool>.ErrorResponse("Ward not found.");

        ward.ConstituencyId = constituencyId;
        await unitOfWork.SaveChangesAsync();

        return ApiResponse<bool>.SuccessResponse(true, "Ward successfully assigned.");
    }
    
    public async Task<ApiResponse<int>> AddAsync(AddConstituencyRequest request)
    {
        var existing = await repo.ExistsByNameAsync(request.ConstituencyName);
        if (existing)
        {
            return ApiResponse<int>.ErrorResponse(
                $"Constituency with the name {request.ConstituencyName} already exists."
            );
        }

        var constituency = new Constituency
        {
            ConstituencyNameEn = request.ConstituencyName,
            Wards = new List<Ward>()
        };

        if (request.WardIds is { Count: > 0 })
        {
            var wards = (await wardRepo.GetByIdsAsync(request.WardIds)).ToList();

            // Optional safety check
            if (wards.Count != request.WardIds.Count)
            {
                return ApiResponse<int>.ErrorResponse(
                    "One or more wards could not be found."
                );
            }

            constituency.Wards = wards.ToList();
        }

        await repo.AddAsync(constituency);
        await unitOfWork.SaveChangesAsync();

        return ApiResponse<int>.SuccessResponse(
            constituency.ConstituencyId,
            "Constituency created successfully."
        );
    }



    public async Task<ApiResponse<int>> UpdateAsync(UpdateConstituencyRequest request)
    {
        var constituency = await repo.GetByIdAsync(request.ConstituencyId);
        if (constituency == null)
            return ApiResponse<int>.ErrorResponse("Constituency not found.");

        var existing = await repo.ExistsByNameExceptIdAsync(request.ConstituencyName, request.ConstituencyId);
        if (existing)
        {
            return ApiResponse<int>.ErrorResponse($"Constituency with the name {request.ConstituencyName} already exists.");
        }
        
        var wards = await wardRepo.GetByIdsAsync(request.WardIds);

        constituency.ConstituencyNameEn = request.ConstituencyName;
        constituency.Wards = wards.ToList();

        await repo.UpdateAsync(constituency);
        await unitOfWork.SaveChangesAsync();

        return ApiResponse<int>.SuccessResponse(constituency.ConstituencyId, "Constituency updated successfully.");
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
