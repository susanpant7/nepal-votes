using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.ElectoralGeographies;

namespace NepalVotes.Application.ElectoralGeographies;

public class VotingPlaceService(IVotingPlaceRepository repo, IUnitOfWork unitOfWork) : IVotingPlaceService
{
    public async Task<ApiResponse<IEnumerable<VotingPlaceInfo>>> GetByWardIdAsync(int wardId)
    {
        var votingPlaces = await repo.GetByWardIdAsync(wardId);
        var votingPlacesInfo = votingPlaces.Select(v => v.ToInfo()).ToList();

        return votingPlacesInfo.Count == 0
            ? ApiResponse<IEnumerable<VotingPlaceInfo>>.SuccessResponse(votingPlacesInfo, "No voting places found for this ward.")
            : ApiResponse<IEnumerable<VotingPlaceInfo>>.SuccessResponse(votingPlacesInfo);
    }

    public async Task<ApiResponse<VotingPlaceInfo?>> GetByIdAsync(int id)
    {
        var votingPlace = await repo.GetByIdAsync(id);
        return votingPlace == null
            ? ApiResponse<VotingPlaceInfo?>.SuccessResponse(null, "Voting place not found.")
            : ApiResponse<VotingPlaceInfo?>.SuccessResponse(votingPlace.ToInfo());
    }

    public async Task<ApiResponse<bool>> AddAsync(AddVotingPlaceRequest request)
    {
        if (await repo.ExistsByAddressAsync(request.VotingPlaceAddress, request.WardId))
            return ApiResponse<bool>.ErrorResponse("Voting place address must be unique in the ward.");

        var entity = new VotingPlace
        {
            VotingPlaceAddress = request.VotingPlaceAddress,
            WardId = request.WardId
        };

        await repo.AddAsync(entity);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "Voting place added successfully.");
    }

    public async Task<ApiResponse<bool>> UpdateAsync(UpdateVotingPlaceRequest request)
    {
        if (await repo.ExistsByAddressAsync(request.VotingPlaceAddress, request.WardId, request.VotingPlaceId))
            return ApiResponse<bool>.ErrorResponse("Voting place address must be unique in the ward.");

        var entity = new VotingPlace
        {
            VotingPlaceId = request.VotingPlaceId,
            VotingPlaceAddress = request.VotingPlaceAddress,
            WardId = request.WardId
        };

        await repo.UpdateAsync(entity);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, "Voting place updated successfully.");
    }

}
