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
    
    public async Task<ApiResponse<bool>> DeleteCandidateAsync(int id)
    {
        var candidate = await repository.GetByIdAsync(id);
        if (candidate == null) return ApiResponse<bool>.ErrorResponse("Candidate not found.");

        await repository.DeleteAsync(candidate);
        await unitOfWork.SaveChangesAsync();
        return ApiResponse<bool>.SuccessResponse(true, "Candidate removed.");
    }
}