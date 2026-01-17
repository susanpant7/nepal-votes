using System.ComponentModel.DataAnnotations;

namespace NepalVotes.Application.PoliticalParties;

public record AddPoliticalPartyRequest(
    string PoliticalPartyName,
    int PartyLeaderId,
    // MediaFile data
    byte[] PartySymbolContent,
    string PartySymbolFileName,
    string PartySymbolContentType,
    long PartySymbolSize 
);

public record EditPoliticalPartyRequest(
    int PoliticalPartyId,
    string PoliticalPartyName,
    int PartyLeaderId,
    // MediaFile data
    byte[]? PartySymbolContent,
    string? PartySymbolFileName,
    string? PartySymbolContentType,
    long PartySymbolSize = 0 
);