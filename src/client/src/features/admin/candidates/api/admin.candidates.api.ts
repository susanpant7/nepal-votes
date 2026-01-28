import apiClient from "@/api/api.client.ts";
import type {
  AddCandidateRequest,
  CandidateDetail,
  CandidateListItem,
  UpdateCandidateRequest,
} from "@/features/admin/candidates/types/admin.candidates.types.ts";
import { ADMIN_CANDIDATE_ENDPOINTS } from "@/features/admin/candidates/api/admin.candidates.endpoints.ts";

export const AdminCandidateApi = {
  // -------- GET --------

  getCandidates: async (): Promise<CandidateListItem[]> =>
    apiClient.get(ADMIN_CANDIDATE_ENDPOINTS.GET_CANDIDATES),

  getCandidatesByConstituencyId: async (
    constituencyId: number,
  ): Promise<CandidateListItem[]> =>
    apiClient.get(
      ADMIN_CANDIDATE_ENDPOINTS.GET_CANDIDATES_BY_CONSTITUENCY_ID(
        constituencyId,
      ),
    ),

  getCandidateDetail: async (candidateId: number): Promise<CandidateDetail> =>
    apiClient.get(ADMIN_CANDIDATE_ENDPOINTS.GET_CANDIDATE_DETAIL(candidateId)),

  // -------- ADD --------

  addCandidate: async (request: AddCandidateRequest): Promise<number> =>
    apiClient.post(ADMIN_CANDIDATE_ENDPOINTS.ADD_CANDIDATE, request),

  // -------- UPDATE --------

  updateCandidate: async (request: UpdateCandidateRequest): Promise<boolean> =>
    apiClient.put(ADMIN_CANDIDATE_ENDPOINTS.UPDATE_CANDIDATE, request),

  // -------- DELETE --------

  deleteCandidate: async (candidateId: number): Promise<boolean> =>
    apiClient.delete(ADMIN_CANDIDATE_ENDPOINTS.DELETE_CANDIDATE(candidateId)),
};
