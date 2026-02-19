using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Candidates;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.MediaFiles;

namespace NepalVotes.Application.Candidates;

public class CandidateService(ICandidateRepository repository, IUnitOfWork unitOfWork) : ICandidateService
{
    public async Task<ApiResponse<PagedResult<CandidateListItem>>> GetCandidatesAsync(int page = 1, int pageSize = 20, List<int>? constituencyIds = null, List<int>? politicalPartyIds = null, bool? isIndependent = null)
    {
        var (candidates, totalCount) = await repository.GetAllAsync(page, pageSize, constituencyIds, politicalPartyIds, isIndependent);

        // Fetch the "Independent" party symbol once to use as fallback for independent candidates
        var independentSymbol = await repository.GetIndependentPartySymbolAsync();

        var candidateListItems = candidates.Select(c => c.ToCandidateListItem(independentSymbol)).ToList();

        var pagedResult = PagedResult<CandidateListItem>.Create(candidateListItems, page, pageSize, totalCount);
        
        return ApiResponse<PagedResult<CandidateListItem>>.SuccessResponse(pagedResult);
    }

    public async Task<ApiResponse<CandidateDetail>> GetCandidateByIdAsync(int id)
    {
        var candidate = await repository.GetByIdAsync(id);
        if (candidate == null)
            return ApiResponse<CandidateDetail>.ErrorResponse("Candidate not found.");

        var independentSymbol = await repository.GetIndependentPartySymbolAsync();
        return ApiResponse<CandidateDetail>.SuccessResponse(candidate.ToCandidateDetail(independentSymbol));
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
            CandidateSymbolId = candidateRequest.IsIndependent ? candidateRequest.CandidateSymbolId : null,
            CandidateImageId = candidateRequest.CandidateImageId ?? 0
        };

        if (candidateRequest.ImageContent != null)
        {
            candidate.CandidateImageMediaFile = new MediaFile
            {
                Content = candidateRequest.ImageContent,
                ContentType = candidateRequest.ImageContentType ?? "image/jpeg",
                FileName = candidateRequest.ImageFileName ?? "candidate.jpg",
                Size = candidateRequest.ImageFileSize ?? candidateRequest.ImageContent.Length
            };
            candidate.CandidateImageId = 0;
        }

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
        existingCandidate.CandidateImageId = candidateRequest.CandidateImageId ?? 0;

        if (candidateRequest.ImageContent != null)
        {
            if (existingCandidate.CandidateImageMediaFile != null)
            {
                existingCandidate.CandidateImageMediaFile.Content = candidateRequest.ImageContent;
                existingCandidate.CandidateImageMediaFile.ContentType = candidateRequest.ImageContentType ?? "image/jpeg";
                existingCandidate.CandidateImageMediaFile.FileName = candidateRequest.ImageFileName ?? "candidate.jpg";
                existingCandidate.CandidateImageMediaFile.Size = candidateRequest.ImageFileSize ?? candidateRequest.ImageContent.Length;
            }
            else
            {
                existingCandidate.CandidateImageMediaFile = new MediaFile
                {
                    Content = candidateRequest.ImageContent,
                    ContentType = candidateRequest.ImageContentType ?? "image/jpeg",
                    FileName = candidateRequest.ImageFileName ?? "candidate.jpg",
                    Size = candidateRequest.ImageFileSize ?? candidateRequest.ImageContent.Length
                };
            }
            existingCandidate.CandidateImageId = 0;
        }
        else if (candidateRequest.CandidateImageId.HasValue)
        {
            // If they provided a new ID but no new upload, we might want to clear the old upload
            // but for now let's assume if ImageId is provided it takes precedence if ImageContent is null
            existingCandidate.CandidateImageMediaFile = null;
            existingCandidate.CandidateImageMediaFileId = null;
        }

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