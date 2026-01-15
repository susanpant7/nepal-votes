using NepalVotes.Domain.PoliticalParties;

namespace NepalVotes.Application.PoliticalParties;

public class PoliticalPartyInfo
{
    public int PoliticalPartyId { get; set; }

    public string PoliticalPartyName { get; set; } = null!;
    
    public string PartyLeaderName { get; set; }

    public byte[] PartySymbolContent { get; set; }

    public string PartySymbolContentType { get; set; }
    public string PartySymbolFileName { get; set; }
}

public static class PoliticalPartyMapper
{
    public static PoliticalPartyInfo ToPartyInfo(this PoliticalParty party)
    {
        return new PoliticalPartyInfo
        {
            PoliticalPartyId = party.PoliticalPartyId,
            PoliticalPartyName = party.PoliticalPartyName,
            PartySymbolContent = party.SymbolMediaFile.Content,
            PartySymbolContentType = party.SymbolMediaFile.ContentType,
            PartySymbolFileName = party.SymbolMediaFile.FileName,
            PartyLeaderName = party.PartyLeader.FirstName + " " + party.PartyLeader.MiddleName + " " + party.PartyLeader.LastName,
        };
    }
}