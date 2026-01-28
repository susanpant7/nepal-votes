import apiClient from "@/api/api.client.ts";
import type { VoterEligibility } from "@/features/voting/types/voting.types.ts";
import { VOTING_ENDPOINTS } from "@/features/voting/api/voting.endpoints.ts";

export const VotingApi = {
  // -------- GET --------
  getVoterEligibility: async (): Promise<VoterEligibility> =>
    apiClient.get(VOTING_ENDPOINTS.GET_VOTER_ELIGIBILITY),
};
