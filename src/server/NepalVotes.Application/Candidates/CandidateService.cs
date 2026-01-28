using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Candidates;
using NepalVotes.Domain.Common;

namespace NepalVotes.Application.Candidates;

public class CandidateService(ICandidateRepository repository, IUnitOfWork unitOfWork) : ICandidateService
{
    public async Task<ApiResponse<IEnumerable<CandidateListItem>>> GetCandidatesByConstituencyIdAsync(int? constituencyId = null)
    {
        var candidates = await repository.GetAllByConstituencyIdAsync(constituencyId);
        var candidateListItems = candidates.Select(c => c.ToCandidateListItem()).ToList();
        
        return candidateListItems.Count != 0
            ? ApiResponse<IEnumerable<CandidateListItem>>.SuccessResponse(candidateListItems)
            : ApiResponse<IEnumerable<CandidateListItem>>.SuccessResponse(candidateListItems, "No candidates found.");
    }

    public async Task<ApiResponse<CandidateDetail>> GetCandidateByIdAsync(int id)
    {
        var candidate = await repository.GetByIdAsync(id);
        return candidate == null 
            ? ApiResponse<CandidateDetail>.ErrorResponse("Candidate not found.") 
            : ApiResponse<CandidateDetail>.SuccessResponse(candidate.ToCandidateDetail());
    }

    public async Task<ApiResponse<bool>> CreateCandidateAsync(CandidateAddRequest candidateRequest)
    {
        var validationResult = ValidateCandidate(candidateRequest.IsIndependent, candidateRequest.PoliticalPartyId, candidateRequest.CandidateSymbolId);
        if (!validationResult.Success) return validationResult;

        var uniqueCheck = await CheckUniquenessAsync(candidateRequest.UserId, candidateRequest.ConstituencyId, 
            candidateRequest.IsIndependent, candidateRequest.PoliticalPartyId, candidateRequest.CandidateSymbolId);
        if (!uniqueCheck.Success) return uniqueCheck;
        
        var candidate = new Candidate
        {
            UserId = candidateRequest.UserId,
            ConstituencyId = candidateRequest.ConstituencyId,
            IsIndependent = candidateRequest.IsIndependent,
            PoliticalPartyId = candidateRequest.IsIndependent ? null : candidateRequest.PoliticalPartyId,
            CandidateSymbolId = candidateRequest.IsIndependent ? candidateRequest.CandidateSymbolId : null
        };

        try 
        {
            await repository.AddAsync(candidate);
            await unitOfWork.SaveChangesAsync();
            return ApiResponse<bool>.SuccessResponse(true, "Candidate created successfully.");
        }
        catch (Exception ex)
        {
            var errors = new List<string>
            {
                $"Failed to create candidate: {ex.InnerException?.Message ?? ex.Message}"
            };
            return ApiResponse<bool>.ErrorResponse("Exception caught while creating candidate.", 500, errors);
        }
    }
    
    public async Task<ApiResponse<bool>> UpdateCandidateAsync(CandidateUpdateRequest candidateRequest)
    {
        var validationResult = ValidateCandidate(candidateRequest.IsIndependent, candidateRequest.PoliticalPartyId, candidateRequest.CandidateSymbolId);
        if (!validationResult.Success) return validationResult;

        var uniqueCheck = await CheckUniquenessAsync(candidateRequest.UserId, candidateRequest.ConstituencyId, 
            candidateRequest.IsIndependent, candidateRequest.PoliticalPartyId, candidateRequest.CandidateSymbolId);
        if (!uniqueCheck.Success) return uniqueCheck;
        
        var existingCandidate = await repository.GetByIdAsync(candidateRequest.CandidateId);
        if (existingCandidate == null)
            return ApiResponse<bool>.ErrorResponse("Candidate not found.");

        existingCandidate.UserId = candidateRequest.UserId;
        existingCandidate.ConstituencyId = candidateRequest.ConstituencyId;
        existingCandidate.IsIndependent = candidateRequest.IsIndependent;
        existingCandidate.PoliticalPartyId = candidateRequest.IsIndependent ? null : candidateRequest.PoliticalPartyId;
        existingCandidate.CandidateSymbolId = candidateRequest.IsIndependent ? candidateRequest.CandidateSymbolId : null;

        try
        {
            await repository.UpdateAsync(existingCandidate);
            await unitOfWork.SaveChangesAsync();
            return ApiResponse<bool>.SuccessResponse(true, "Candidate updated successfully.");
        }
        catch (Exception ex)
        {
            var errors = new List<string>
            {
                $"Failed to update candidate: {ex.InnerException?.Message ?? ex.Message}"
            };
            return ApiResponse<bool>.ErrorResponse("Exception caught while updating candidate.", 500, errors);
        }
    }

    private static ApiResponse<bool> ValidateCandidate(bool isIndependent, int? partyId, int? symbolId)
    {
        if (isIndependent)
        {
            if (symbolId == null)
                return ApiResponse<bool>.ErrorResponse("Independent candidates must provide a custom symbol.");
        }
        else
        {
            if (partyId == null)
                return ApiResponse<bool>.ErrorResponse("Non-independent candidates must select a political party.");
        }

        return ApiResponse<bool>.SuccessResponse(true);
    }
    
    private async Task<ApiResponse<bool>> CheckUniquenessAsync(
        int userId, 
        int constituencyId, 
        bool isIndependent, 
        int? partyId, 
        int? symbolId, 
        int? excludeId = null)
    {
        // 1. Check User Uniqueness (Global)
        var existingConstituencyName = await repository.GetConstituencyNameByUserIdAsync(userId, excludeId);
        if (existingConstituencyName != null)
        {
            return ApiResponse<bool>.ErrorResponse($"This user is already registered as a candidate in {existingConstituencyName}."
            );
        }

        // 2. Check Party Uniqueness (Per Constituency)
        if (!isIndependent && partyId.HasValue)
        {
            if (await repository.IsPartyTakenInConstituencyAsync(constituencyId, partyId.Value, excludeId))
                return ApiResponse<bool>.ErrorResponse("This political party already has a candidate in this constituency.");
        }

        // 3. Check Symbol Uniqueness (Per Constituency)
        if (!isIndependent || !symbolId.HasValue) return ApiResponse<bool>.SuccessResponse(true);
        if (await repository.IsSymbolTakenInConstituencyAsync(constituencyId, symbolId.Value, excludeId))
            return ApiResponse<bool>.ErrorResponse("This election symbol is already taken by another independent in this constituency.");

        return ApiResponse<bool>.SuccessResponse(true);
    }
    
    public async Task<ApiResponse<bool>> DeleteCandidateAsync(int id)
    {
        var candidate = await repository.GetByIdAsync(id);
        if (candidate == null) return ApiResponse<bool>.ErrorResponse("Candidate not found.");

        await repository.DeleteAsync(candidate);
        await unitOfWork.SaveChangesAsync();
        return ApiResponse<bool>.SuccessResponse(true, "Candidate removed.");
    }
}