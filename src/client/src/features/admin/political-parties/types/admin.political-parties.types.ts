//domain
export interface PoliticalPartyInfo {
  politicalPartyId: number;
  politicalPartyName: string;
  partyLeaderName: string;
  partyLeaderId: number;
  partySymbolContent: string;
  partySymbolContentType: string;
  partySymbolFileName: string;
}

export interface PoliticalPartySelectInfo {
  politicalPartyId: number;
  politicalPartyName: string;
  symbolContent: string; // Base64 string
  symbolContentType: string; // e.g., "image/png"
  symbolFileName: string;
}
// requests
export interface AddEditPoliticalPartyRequest {
  politicalPartyId: number;
  politicalPartyName: string;
  partyLeaderId: number;
  partySymbolContent: File | string | null;
}
// responses
