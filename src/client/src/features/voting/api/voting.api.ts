import apiClient from "@/api/api.client.ts";
import type {
  SubmitVoteRequest,
  VoterCandidateSelectOptions,
  VoterEligibility,
  VoterPartySelectOptions,
} from "@/features/voting/types/voting.types.ts";
import { VOTING_ENDPOINTS } from "@/features/voting/api/voting.endpoints.ts";

export const VotingApi = {
  // -------- GET --------
  getVoterEligibility: async (): Promise<VoterEligibility> =>
    apiClient.get(VOTING_ENDPOINTS.GET_VOTER_ELIGIBILITY),
  getVoterCandidates: async (): Promise<VoterCandidateSelectOptions[]> =>
    apiClient.get(VOTING_ENDPOINTS.GET_VOTER_CANDIDATES),
  getVoterParties: async (): Promise<VoterPartySelectOptions[]> =>
    apiClient.get(VOTING_ENDPOINTS.GET_VOTER_PARTIES),
  submitVote: async (request: SubmitVoteRequest): Promise<boolean> =>
    apiClient.post(VOTING_ENDPOINTS.SUBMIT_VOTE, request),
};
