namespace NepalVotes.Api.PoliticalParties;

public record AddEditPoliticalPartyApiRequest
(
    string PoliticalPartyName,
    int PartyLeaderId,
    IFormFile PartySymbolFile
);
public record EditPoliticalPartyApiRequest
(
    int PoliticalPartyId,
    string PoliticalPartyName,
    int PartyLeaderId,
    IFormFile? PartySymbolFile
);

