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
  candidatesByConstituencyId: (constituencyId: number) =>
    ["candidates-by-constituencyId", constituencyId] as const,
  candidateDetail: (candidateId: number) =>
    ["candidates-by-candidateId", candidateId] as const,
};

// --------------------------------------------------
// QUERIES (params passed at function level)
// --------------------------------------------------
export const useAdminCandidateQuery = {
  getCandidates: () =>
    useQuery({
      queryKey: QUERY_KEYS.candidates,
      queryFn: () => AdminCandidateApi.getCandidates(),
      staleTime: 5 * 60 * 1000,
    }),
  getCandidatesByConstituencyId: (constituencyId: number) =>
    useQuery({
      queryKey: QUERY_KEYS.candidatesByConstituencyId(constituencyId),
      queryFn: () =>
        AdminCandidateApi.getCandidatesByConstituencyId(constituencyId),
      staleTime: 5 * 60 * 1000,
      enabled: constituencyId !== 0,
    }),
  getCandidateDetail: (candidateId: number) =>
    useQuery({
      queryKey: QUERY_KEYS.candidateDetail(candidateId),
      queryFn: () => AdminCandidateApi.getCandidateDetail(candidateId),
      staleTime: 5 * 60 * 1000,
    }),
};

// --------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------
const refreshCandidatesByConstituencyId = async (
  queryClient: QueryClient,
  constituencyId: number,
) => {
  await queryClient.invalidateQueries({
    queryKey: QUERY_KEYS.candidatesByConstituencyId(constituencyId),
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
      onSuccess: async (_, request) =>
        await refreshCandidatesByConstituencyId(
          queryClient,
          request.constituencyId,
        ),
    }),

    updateCandidate: useMutation({
      mutationFn: (request: UpdateCandidateRequest) =>
        AdminCandidateApi.updateCandidate(request),
      onSuccess: async (_, request) =>
        await refreshCandidatesByConstituencyId(
          queryClient,
          request.constituencyId,
        ),
    }),

    deleteCandidate: useMutation({
      mutationFn: (request: { candidateId: number; constituencyId: number }) =>
        AdminCandidateApi.deleteCandidate(request.candidateId),
      onSuccess: async (_, request) =>
        await refreshCandidatesByConstituencyId(
          queryClient,
          request.constituencyId,
        ),
    }),
  };
};
