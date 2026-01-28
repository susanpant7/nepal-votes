//domain
export interface CandidateListItem {
  candidateId: number;
  fullName: string;
  constituencyId: number;
  constituencyName: string;
  isIndependent: boolean;
  politicalPartyName: string | null;
  symbolContent: string; // Base64 string
  symbolContentType: string; // e.g., "image/png"
}
export interface CandidateDetail {
  candidateId: number;
  candidateName: string;
  userId: number;
  isIndependent: boolean;
  partySymbolContent: string;
  partySymbolContentType: string;
  partySymbolFileName: string;
  symbolContent: string; // Base64 string
  symbolContentType: string; // e.g., "image/png"
  candidateSymbolFileName: string;
}
// requests
export interface AddCandidateRequest {
  userId: number;
  politicalPartyId: number | null;
  isIndependent: boolean;
  constituencyId: number;
  candidateSymbolId: number | null;
}
export interface UpdateCandidateRequest extends AddCandidateRequest {
  candidateId: number;
}

// responses
