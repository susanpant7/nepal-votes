//domain
export interface PoliticalPartyInfo{
    politicalPartyId: number;
    politicalPartyName: string;
    partyLeaderName: string;
    partySymbolContent: string;
    partySymbolContentType: string;
    partySymbolFileName: string;
}

// requests
export interface AddEditPoliticalPartyRequest{
    politicalPartyId: number,
    politicalPartyName: string,
    partyLeaderName: string,
    partySymbolContent: File | string | null,
}
// responses