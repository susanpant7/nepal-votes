//domain
export type VotingSection =
  | "ELIGIBILITY"
  | "INFO"
  | "BALLOT"
  | "CONFIRM"
  | "SUCCESS"
  | "ERROR";

// requests
export interface SubmitVoteRequest {
  candidateId: number;
  partyId: number;
  votedFromLocation: string;
}
// responses
export interface VoterEligibility {
  canVote: boolean;
  message: string;
  constituencyName: string;
}

export interface VoterCandidateSelectOptions {
  candidateId: number;
  candidateName: string;
  symbolContent: string;
  symbolContentType: string;
  symbolFileName: string;
}
export interface VoterPartySelectOptions {
  partyId: number;
  partyName: string;
  symbolContent: string;
  symbolContentType: string;
  symbolFileName: string;
}
