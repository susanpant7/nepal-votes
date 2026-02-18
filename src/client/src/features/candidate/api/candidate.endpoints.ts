export const VOTING_ENDPOINTS = {
  GET_VOTER_ELIGIBILITY: "/api/votes/eligibility",
  GET_VOTER_CANDIDATES: "/api/votes/options/candidates",
  GET_VOTER_PARTIES: "/api/votes/options/parties",
  SUBMIT_VOTE: "/api/votes/submit",
} as const;
