//domain
export interface PoliticalPartyInfo{
    politicalPartyId: number;
    politicalPartyName: string;
    partyLeaderName: string;
    partyLeaderId: number;
    partySymbolContent: string;
    partySymbolContentType: string;
    partySymbolFileName: string;
}

// requests
export interface AddEditPoliticalPartyRequest{
    politicalPartyId: number,
    politicalPartyName: string,
    partyLeaderId: number,
    partySymbolContent: File | string | null,
}
// responses