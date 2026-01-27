import {
  type QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AdminCandidateSymbolApi } from "@/features/admin/candidate-symbols/api/admin.candidate-symbols.api.ts";
import type {
  AddCandidateSymbolRequest,
  UpdateCandidateSymbolRequest,
} from "@/features/admin/candidate-symbols/types/admin.candidate-symbols.types.ts";

// --------------------------------------------------
// QUERY KEYS
// --------------------------------------------------
export const QUERY_KEYS = {
  candidateSymbols: ["candidateSymbols"] as const,
};

// --------------------------------------------------
// QUERIES
// --------------------------------------------------
export const useAdminCandidateSymbolQuery = {
  getCandidateSymbols: (pageNumber: number, pageSize: number = 10) =>
    useQuery({
      queryKey: [...QUERY_KEYS.candidateSymbols, pageNumber],
      queryFn: () =>
        AdminCandidateSymbolApi.getCandidateSymbols(pageNumber, pageSize),
      staleTime: 5 * 60 * 1000,
    }),
};

// --------------------------------------------------
// HELPER
// --------------------------------------------------
const refreshCandidateSymbols = async (queryClient: QueryClient) => {
  await queryClient.invalidateQueries({
    queryKey: QUERY_KEYS.candidateSymbols,
  });
};

// --------------------------------------------------
// MUTATIONS
// --------------------------------------------------
export const useAdminCandidateSymbolMutation = () => {
  const queryClient = useQueryClient();

  return {
    addCandidateSymbol: useMutation({
      mutationFn: (request: AddCandidateSymbolRequest) =>
        AdminCandidateSymbolApi.addCandidateSymbol(request),
      onSuccess: async () => await refreshCandidateSymbols(queryClient),
    }),

    updateCandidateSymbol: useMutation({
      mutationFn: (request: UpdateCandidateSymbolRequest) =>
        AdminCandidateSymbolApi.updateCandidateSymbol(request),
      onSuccess: async () => await refreshCandidateSymbols(queryClient),
    }),

    deleteCandidateSymbol: useMutation({
      mutationFn: (candidateSymbolId: number) =>
        AdminCandidateSymbolApi.deleteCandidateSymbol(candidateSymbolId),
      onSuccess: async () => await refreshCandidateSymbols(queryClient),
    }),
  };
};
