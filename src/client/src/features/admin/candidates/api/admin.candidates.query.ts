import {
  type QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  AddCandidateRequest,
  UpdateCandidateRequest,
} from "@/features/admin/candidates/types/admin.candidates.types.ts";
import { AdminCandidateApi } from "@/features/admin/candidates/api/admin.candidates.api.ts";

// --------------------------------------------------
// QUERY KEYS
// --------------------------------------------------
export const QUERY_KEYS = {
  candidates: ["candidates"] as const,
};

// --------------------------------------------------
// QUERIES (params passed at function level)
// --------------------------------------------------
export const useAdminCandidateQuery = {
  getCandidates: () =>
    useQuery({
      queryKey: QUERY_KEYS.candidates,
      queryFn: AdminCandidateApi.getCandidates,
      staleTime: 5 * 60 * 1000,
    }),
  getCandidateDetail: (candidateId: number) =>
    useQuery({
      queryKey: QUERY_KEYS.candidates,
      queryFn: () => AdminCandidateApi.getCandidateDetail(candidateId),
      staleTime: 5 * 60 * 1000,
    }),
};

// --------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------
const refreshCandidates = async (queryClient: QueryClient) => {
  await queryClient.invalidateQueries({
    queryKey: QUERY_KEYS.candidates,
  });
};

// --------------------------------------------------
// MUTATIONS
// --------------------------------------------------
export const useAdminCandidateMutation = () => {
  const queryClient = useQueryClient();

  return {
    addCandidate: useMutation({
      mutationFn: (request: AddCandidateRequest) =>
        AdminCandidateApi.addCandidate(request),
      onSuccess: async () => await refreshCandidates(queryClient),
    }),

    updateCandidate: useMutation({
      mutationFn: (request: UpdateCandidateRequest) =>
        AdminCandidateApi.updateCandidate(request),
      onSuccess: async () => await refreshCandidates(queryClient),
    }),

    deleteCandidate: useMutation({
      mutationFn: (request: { candidateId: number }) =>
        AdminCandidateApi.deleteCandidate(request.candidateId),
      onSuccess: async () => await refreshCandidates(queryClient),
    }),
  };
};
