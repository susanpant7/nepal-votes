import { useMutation, useQuery } from "@tanstack/react-query";
import { CandidateApi } from "@/features/candidate/api/candidate.api.ts";
import type { SubmitVoteRequest } from "@/features/voting/types/voting.types.ts";

// --------------------------------------------------
// QUERY KEYS
// --------------------------------------------------
export const QUERY_KEYS = {
  votingDetail: ["votingDetail"] as const,
  voterEligibility: ["voterEligibility"] as const,
  voterCandidates: ["voterCandidates"] as const,
  voterParties: ["voterParties"] as const,
  provinces: ["provinces"] as const,
  districts: (provinceId: number) => ["districts", provinceId] as const,
  constituencies: (districtId: number) =>
    ["constituencies", districtId] as const,
  candidates: ["candidates"] as const,
};

// --------------------------------------------------
// QUERIES (params passed at function level)
// --------------------------------------------------
export const useCandidateQuery = {
  useGetProvinces: () =>
    useQuery({
      queryKey: QUERY_KEYS.provinces,
      queryFn: () => CandidateApi.getProvinces(),
    }),

  useGetAllDistricts: () =>
    useQuery({
      queryKey: ["allDistricts"],
      queryFn: () => CandidateApi.getAllDistricts(),
    }),

  useGetDistrictsByProvinceId: (provinceId: number | null) =>
    useQuery({
      queryKey: QUERY_KEYS.districts(provinceId!),
      queryFn: () => CandidateApi.getDistrictsByProvinceId(provinceId!),
      enabled: !!provinceId,
    }),

  useGetAllConstituencies: () =>
    useQuery({
      queryKey: ["allConstituencies"],
      queryFn: () => CandidateApi.getAllConstituencies(),
    }),

  useGetConstituencyListItemsByDistrictId: (districtId: number | null) =>
    useQuery({
      queryKey: QUERY_KEYS.constituencies(districtId!),
      queryFn: () => CandidateApi.getConstituencyListItemsByDistrictId(districtId!),
      enabled: !!districtId,
    }),

  useGetCandidates: (params?: { page?: number; pageSize?: number; constituencyIds?: number[]; politicalPartyIds?: number[]; isIndependent?: boolean }) =>
    useQuery({
      queryKey: ["candidates", params],
      queryFn: () => CandidateApi.getCandidates(params),
      placeholderData: (previousData) => previousData,
    }),

  useGetCandidateById: (id: number) =>
    useQuery({
      queryKey: ["candidate", id],
      queryFn: () => CandidateApi.getCandidateById(id),
      enabled: !!id,
    }),

  useGetParties: () =>
    useQuery({
      queryKey: ["parties"],
      queryFn: () => CandidateApi.getParties(),
    }),

  // Legacy/Voting queries
  useGetVoterEligibility: () =>
    useQuery({
      queryKey: QUERY_KEYS.voterEligibility,
      queryFn: () => CandidateApi.getVoterEligibility(),
    }),
  useGetVoterCandidates: () =>
    useQuery({
      queryKey: QUERY_KEYS.voterCandidates,
      queryFn: () => CandidateApi.getVoterCandidates(),
    }),
  useGetVoterParties: () =>
    useQuery({
      queryKey: QUERY_KEYS.voterParties,
      queryFn: () => CandidateApi.getVoterParties(),
    }),
};

// --------------------------------------------------
// MUTATIONS
// --------------------------------------------------
export const useVotingMutation = () => {
  return {
    submitVote: useMutation({
      mutationFn: (request: SubmitVoteRequest) => CandidateApi.submitVote(request),
      onSuccess: async () => console.log("voted"), //window.location.reload()
    }),
  };
};
