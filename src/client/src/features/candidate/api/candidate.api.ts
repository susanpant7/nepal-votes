import apiClient from "@/api/api.client.ts";
import type {
  SubmitVoteRequest,
  VoterCandidateSelectOptions,
  VoterEligibility,
  VoterPartySelectOptions,
} from "@/features/voting/types/voting.types.ts";
import { VOTING_ENDPOINTS } from "@/features/voting/api/voting.endpoints.ts";
import { ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS } from "@/features/admin/electoral-geographies/api/admin.electoral-geographies.endpoints.ts";
import { ADMIN_ELECTORAL_CONSTITUENCIES_ENDPOINTS } from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.endpoints.ts";
import { ADMIN_CANDIDATE_ENDPOINTS } from "@/features/admin/candidates/api/admin.candidates.endpoints.ts";
import type {
  DistrictInfo,
  ProvinceInfo,
} from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import type { ConstituencyListItem, ConstituencyFilterItem } from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import type {
  CandidateDetail,
  CandidateListItem,
  PagedResult,
} from "@/features/admin/candidates/types/admin.candidates.types.ts";

export const CandidateApi = {
  // -------- GET --------
  getProvinces: async (): Promise<ProvinceInfo[]> =>
    apiClient.get(ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.GET_PROVINCES),

  getAllDistricts: async (): Promise<DistrictInfo[]> =>
    apiClient.get(ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.GET_ALL_DISTRICTS),

  getDistrictsByProvinceId: async (provinceId: number): Promise<DistrictInfo[]> =>
    apiClient.get(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.GET_DISTRICTS_BY_PROVINCE_ID(
        provinceId,
      ),
    ),

  getAllConstituencies: async (): Promise<ConstituencyFilterItem[]> =>
    apiClient.get("/api/constituencies/all-with-location"),

  getConstituencyListItemsByDistrictId: async (
    districtId: number,
  ): Promise<ConstituencyListItem[]> =>
    apiClient.get(
      ADMIN_ELECTORAL_CONSTITUENCIES_ENDPOINTS.GET_ELECTORAL_CONSTITUENCIES_LIST_ITEMS_BY_DISTRICT_ID(
        districtId,
      ),
    ),

  getCandidates: async (
    params?: {
      page?: number;
      pageSize?: number;
      constituencyIds?: number[];
      politicalPartyIds?: number[];
      isIndependent?: boolean;
      searchTerm?: string;
    }
  ): Promise<PagedResult<CandidateListItem>> =>
    apiClient.post(`${ADMIN_CANDIDATE_ENDPOINTS.GET_CANDIDATES}/search`, {
      ...params,
      constituencyIds: params?.constituencyIds,
      politicalPartyIds: params?.politicalPartyIds,
    }),

  getCandidateById: async (id: number): Promise<CandidateDetail> =>
    apiClient.get(`${ADMIN_CANDIDATE_ENDPOINTS.GET_CANDIDATES}/${id}`),

  getParties: async (): Promise<{ politicalPartyId: number; politicalPartyNameEn: string }[]> =>
    apiClient.get("/api/political-parties/dropdown"),

  // Existing Voting API methods (kept for compatibility or refactor if needed)
  getVoterEligibility: async (): Promise<VoterEligibility> =>
    apiClient.get(VOTING_ENDPOINTS.GET_VOTER_ELIGIBILITY),
  getVoterCandidates: async (): Promise<VoterCandidateSelectOptions[]> =>
    apiClient.get(VOTING_ENDPOINTS.GET_VOTER_CANDIDATES),
  getVoterParties: async (): Promise<VoterPartySelectOptions[]> =>
    apiClient.get(VOTING_ENDPOINTS.GET_VOTER_PARTIES),
  submitVote: async (request: SubmitVoteRequest): Promise<boolean> =>
    apiClient.post(VOTING_ENDPOINTS.SUBMIT_VOTE, request),
};
