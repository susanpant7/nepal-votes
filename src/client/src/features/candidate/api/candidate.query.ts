import { useMutation, useQuery } from "@tanstack/react-query";
import { VotingApi } from "@/features/voting/api/voting.api.ts";
import type { SubmitVoteRequest } from "@/features/voting/types/voting.types.ts";

// --------------------------------------------------
// QUERY KEYS
// --------------------------------------------------
export const QUERY_KEYS = {
  votingDetail: ["votingDetail"] as const,
  voterEligibility: ["voterEligibility"] as const,
  voterCandidates: ["voterCandidates"] as const,
  voterParties: ["voterParties"] as const,
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
  getVoterCandidates: () =>
    useQuery({
      queryKey: QUERY_KEYS.voterCandidates,
      queryFn: () => VotingApi.getVoterCandidates(),
    }),
  getVoterParties: () =>
    useQuery({
      queryKey: QUERY_KEYS.voterParties,
      queryFn: () => VotingApi.getVoterParties(),
    }),
};

// --------------------------------------------------
// MUTATIONS
// --------------------------------------------------
export const useVotingMutation = () => {
  return {
    submitVote: useMutation({
      mutationFn: (request: SubmitVoteRequest) => VotingApi.submitVote(request),
      onSuccess: async () => console.log("voted"), //window.location.reload()
    }),
  };
};
