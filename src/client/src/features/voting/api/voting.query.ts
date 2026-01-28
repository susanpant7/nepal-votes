import { useQuery } from "@tanstack/react-query";
import { VotingApi } from "@/features/voting/api/voting.api.ts";

// --------------------------------------------------
// QUERY KEYS
// --------------------------------------------------
export const QUERY_KEYS = {
  votingDetail: ["votingDetail"] as const,
  voterEligibility: ["voterEligibility"] as const,
};

// --------------------------------------------------
// QUERIES (params passed at function level)
// --------------------------------------------------
export const useVotingQuery = {
  getVoterEligibility: () =>
    useQuery({
      queryKey: QUERY_KEYS.voterEligibility,
      queryFn: () => VotingApi.getVoterEligibility(),
    }),
};
