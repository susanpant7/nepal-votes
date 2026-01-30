//domain
export type VotingSection =
  | "ELIGIBILITY"
  | "INFO"
  | "BALLOT"
  | "CONFIRM"
  | "SUCCESS";
// requests

// responses
export interface VoterEligibility {
  canVote: boolean;
  message: string;
}

export interface VoterCandidateSelectOptions {
  candidateId: number;
  symbolContent: string;
  symbolContentType: string;
  symbolFileName: string;
}
export interface VoterPartySelectOptions {
  partyId: number;
  symbolContent: string;
  symbolContentType: string;
  symbolFileName: string;
}
