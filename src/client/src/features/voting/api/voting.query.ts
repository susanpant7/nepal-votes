import { useQuery } from "@tanstack/react-query";

// --------------------------------------------------
// QUERY KEYS
// --------------------------------------------------
export const QUERY_KEYS = {
  votingDetail: ["votingDetail"] as const,
};

// --------------------------------------------------
// QUERIES (params passed at function level)
// --------------------------------------------------
export const useAdminCandidateQuery = {
  getVotingDetail: () =>
    useQuery({
      queryKey: QUERY_KEYS.votingDetail,
      // queryFn: () => AdminCandidateApi.getCandidates(),
      staleTime: 5 * 60 * 1000,
    }),
};
