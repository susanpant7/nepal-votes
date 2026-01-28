import { ADMIN_CANDIDATE_SYMBOL_ENDPOINTS } from "@/features/admin/candidate-symbols/api/admin.candidate-symbols.endpoints.ts";
import apiClient from "@/api/api.client.ts";
import type {
  AddCandidateSymbolRequest,
  CandidateSymbolPagedResult,
  UpdateCandidateSymbolRequest,
} from "@/features/admin/candidate-symbols/types/admin.candidate-symbols.types.ts";

export const AdminCandidateSymbolApi = {
  // -------- GET --------

  getCandidateSymbols: async (
    pageNumber: number,
    pageSize: number,
  ): Promise<CandidateSymbolPagedResult> =>
    apiClient.get(
      ADMIN_CANDIDATE_SYMBOL_ENDPOINTS.GET_CANDIDATE_SYMBOLS(
        pageNumber,
        pageSize,
      ),
    ),

  // -------- ADD --------

  addCandidateSymbol: async (
    request: AddCandidateSymbolRequest,
  ): Promise<boolean> => {
    const formData = new FormData();
    formData.append("candidateSymbolFile", request.candidateSymbolFile!);

    return apiClient.post(
      ADMIN_CANDIDATE_SYMBOL_ENDPOINTS.ADD_CANDIDATE_SYMBOL,
      formData,
    );
  },

  // -------- UPDATE --------

  updateCandidateSymbol: async (
    request: UpdateCandidateSymbolRequest,
  ): Promise<boolean> => {
    const formData = new FormData();
    formData.append("candidateSymbolId", request.candidateSymbolId.toString());
    formData.append("candidateSymbolFile", request.candidateSymbolFile!);

    return apiClient.put(
      ADMIN_CANDIDATE_SYMBOL_ENDPOINTS.UPDATE_CANDIDATE_SYMBOL,
      formData,
    );
  },

  // -------- DELETE --------

  deleteCandidateSymbol: async (candidateSymbolId: number): Promise<boolean> =>
    apiClient.delete(
      ADMIN_CANDIDATE_SYMBOL_ENDPOINTS.DELETE_CANDIDATE_SYMBOL(
        candidateSymbolId,
      ),
    ),
};
