using NepalVotes.Application.ResponseHelpers;
using NepalVotes.Domain.Common;
using NepalVotes.Domain.MediaFiles;
using NepalVotes.Domain.PoliticalParties;

namespace NepalVotes.Application.PoliticalParties;

public class PoliticalPartyService(IPoliticalPartyRepository repository,
    IUnitOfWork unitOfWork) : IPoliticalPartyService
{
    public async Task<ApiResponse<IEnumerable<PoliticalPartyInfo>>> GetPartiesAsync()
    {
        var parties = await repository.GetAllPartiesAsync();
        
        var partiesInfo = parties.Select(party => party.ToPartyInfo()).ToList();

        return partiesInfo.Count == 0 ? 
            ApiResponse<IEnumerable<PoliticalPartyInfo>>.SuccessResponse(partiesInfo, "No political parties found.") 
            : ApiResponse<IEnumerable<PoliticalPartyInfo>>.SuccessResponse(partiesInfo);
    }
    
    public async Task<ApiResponse<PoliticalPartyInfo>> GetByIdAsync(int id)
    {
        var party = await repository.GetByIdAsync(id);

        return party == null ? 
            ApiResponse<PoliticalPartyInfo>.ErrorResponse("No political parties found.", 404) 
            : ApiResponse<PoliticalPartyInfo>.SuccessResponse(party.ToPartyInfo());
    }
    
    public async Task<ApiResponse<bool>> AddPoliticalPartyAsync(AddPoliticalPartyRequest request)
    {
        var symbol = new MediaFile
        {
            Content = request.PartySymbolContent,
            FileName = request.PartySymbolFileName!,
            ContentType = request.PartySymbolContentType!,
            Size = request.PartySymbolSize
        };

        var party = new PoliticalParty
        {
            PoliticalPartyName = request.PoliticalPartyName,
            PartyLeaderId = request.PartyLeaderId,
            SymbolMediaFile = symbol
        };

        await repository.AddPoliticalPartyAsync(party);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, $"Political party {request.PoliticalPartyName} created successfuly");
    }
    
    public async Task<ApiResponse<bool>> EditPoliticalPartyAsync(EditPoliticalPartyRequest request)
    {
        var party = await repository.GetByIdAsync(request.PoliticalPartyId);
        if (party == null)
            return ApiResponse<bool>.ErrorResponse("No political party found to edit for the give request", 404);

        party.PoliticalPartyName = request.PoliticalPartyName;
        party.PartyLeaderId = request.PartyLeaderId;

        if (request.PartySymbolContent != null 
            && !string.IsNullOrWhiteSpace(request.PartySymbolFileName)
            && !string.IsNullOrWhiteSpace(request.PartySymbolContentType)
            && request.PartySymbolSize > 0)
        {
            party.SymbolMediaFile.Content = request.PartySymbolContent;
            party.SymbolMediaFile.FileName = request.PartySymbolFileName;
            party.SymbolMediaFile.ContentType = request.PartySymbolContentType;
            party.SymbolMediaFile.Size = request.PartySymbolSize;
        }

        await repository.UpdatePoliticalPartyAsync(party);
        await unitOfWork.SaveChangesAsync();
        
        return ApiResponse<bool>.SuccessResponse(true, $"Political party {request.PoliticalPartyName} updated successfuly");

    }
}