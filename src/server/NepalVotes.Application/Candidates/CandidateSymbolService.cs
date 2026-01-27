using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Candidates;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.MediaFiles;

namespace NepalVotes.Application.Candidates;

public class CandidateSymbolService(ICandidateSymbolRepository repository, IUnitOfWork unitOfWork) : ICandidateSymbolService
{
    public async Task<ApiResponse<PagedResult<CandidateSymbolInfo>>>
        GetCandidateSymbolsAsync(int pageNumber, int pageSize)
    {
        if (pageNumber <= 0)
        {
            return ApiResponse<PagedResult<CandidateSymbolInfo>>
                .ErrorResponse("Page number must be greater than zero.");
        }
        if (pageSize <= 0)
        {
            return ApiResponse<PagedResult<CandidateSymbolInfo>>
                .ErrorResponse("Page size must be greater than zero.");
        }
        
        var skip = (pageNumber - 1) * pageSize;

        var (items, totalCount) = await repository.GetPagedAsync(skip, pageSize);

        var mappedItems = items
            .Select(x => x.ToSymbolInfo())
            .ToList();

        var result = PagedResult<CandidateSymbolInfo>.Create(
            mappedItems,
            pageNumber,
            pageSize,
            totalCount
        );
        return ApiResponse<PagedResult<CandidateSymbolInfo>>.SuccessResponse(result);
    }

    public async Task<ApiResponse<bool>> AddCandidateSymbolAsync(AddCandidateSymbolRequest request)
    {
        var mediaFile = new MediaFile
        {
            Content = request.FileContent,
            FileName = request.FileName,
            ContentType = request.ContentType,
            Size = request.FileSize
        };

        var candidateSymbol = new CandidateSymbol
        {
            CandidateSymbolMediaFile = mediaFile
        };

        await repository.AddAsync(candidateSymbol);
        await unitOfWork.SaveChangesAsync();

        return ApiResponse<bool>.SuccessResponse(
            true,
            "Candidate symbol created successfully"
        );
    }
    
    public async Task<ApiResponse<bool>> UpdateCandidateSymbolAsync(UpdateCandidateSymbolRequest request)
    {
        var candidateSymbol = await repository.GetByIdAsync(request.CandidateSymbolId);

        if (candidateSymbol == null)
        {
            return ApiResponse<bool>.ErrorResponse("Candidate symbol not found.");
        }

        var mediaFile = candidateSymbol.CandidateSymbolMediaFile;

        // Replace file data
        mediaFile.Content = request.FileContent;
        mediaFile.FileName = request.FileName;
        mediaFile.ContentType = request.ContentType;
        mediaFile.Size = request.FileSize;

        await unitOfWork.SaveChangesAsync();

        return ApiResponse<bool>.SuccessResponse(
            true,
            "Candidate symbol updated successfully"
        );
    }
    
    public async Task<ApiResponse<bool>> DeleteCandidateSymbolAsync(int candidateSymbolId)
    {
        var candidateSymbol = await repository.GetByIdAsync(candidateSymbolId);

        if (candidateSymbol == null)
        {
            return ApiResponse<bool>.ErrorResponse("Candidate symbol not found.");
        }

        var isInUse = await repository.IsInUseAsync(candidateSymbolId);
        if (isInUse)
        {
            return ApiResponse<bool>.ErrorResponse(
                "Candidate symbol is assigned to one or more candidates and cannot be deleted."
            );
        }

        repository.Delete(candidateSymbol);
        await unitOfWork.SaveChangesAsync();

        return ApiResponse<bool>.SuccessResponse(
            true,
            "Candidate symbol deleted successfully"
        );
    }


}
