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
