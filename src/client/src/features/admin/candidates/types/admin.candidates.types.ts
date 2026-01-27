//domain
export interface CandidateListItem {}
export interface CandidateDetail {
  candidateId: number;
  candidateName: string;
  userId: number;
  isIndependent: boolean;
  partySymbolContent: string;
  partySymbolContentType: string;
  partySymbolFileName: string;
  candidateSymbolContent: string;
  candidateSymbolContentType: string;
  candidateSymbolFileName: string;
}
// requests
export interface AddCandidateRequest {}
export interface UpdateCandidateRequest {
  candidateId: number;
}

// responses
