using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Candidates;
using NepalVotes.Domain.Common;

namespace NepalVotes.Application.Candidates;

public class CandidateService(ICandidateRepository repository, IUnitOfWork unitOfWork) : ICandidateService
{
    public async Task<ApiResponse<IEnumerable<CandidateListItem>>> GetCandidatesAsync()
    {
        var candidates = await repository.GetAllAsync();
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

    public async Task<ApiResponse<bool>> CreateCandidateAsync(Candidate candidate)
    {
        // Business logic: Ensure symbol is provided if independent
        if (candidate is { IsIndependent: true, CandidateSymbolMediaFileId: null })
            return ApiResponse<bool>.ErrorResponse("Independent candidates must provide a symbol.");

        await repository.AddAsync(candidate);
        await unitOfWork.SaveChangesAsync();
        return ApiResponse<bool>.SuccessResponse(true, "Candidate created successfully.");
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