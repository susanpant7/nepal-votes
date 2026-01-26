import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminElectoralConstituencyApi } from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.api.ts";
import type {
  AddConstituencyRequest,
  EditConstituencyRequest,
  ReassignWardRequest,
} from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";

export const ADMIN_CONSTITUENCY_KEYS = {
  getConstituencies: ["getConstituencies"] as const,
  getConstituenciesDropdown: ["getConstituenciesDropdown"] as const,
  getUnassignedWards: ["getUnassignedWards"] as const,
  getConstituenciesListItemsBydDistrictId: (districtId: number) =>
    ["getConstituencies", districtId] as const,
  getConstituencyById: (id: number) => ["getConstituency", id] as const,
  getWardAssignmentsByMunicipalityId: (id: number) =>
    ["getWardAssignments", id] as const,
  addConstituency: ["addConstituency"] as const,
  editConstituency: ["setConstituency"] as const,
};

export const useAdminConstituencyQuery = {
  getConstituenciesDropdown: () =>
    useQuery({
      queryKey: ADMIN_CONSTITUENCY_KEYS.getConstituenciesDropdown,
      queryFn: AdminElectoralConstituencyApi.getConstituenciesDropdown,
      refetchOnMount: true,
      staleTime: 5 * 60 * 1000,
    }),
  getConstituenciesListItemsBydDistrictId: (districtId: number | null) =>
    useQuery({
      queryKey: ADMIN_CONSTITUENCY_KEYS.getConstituenciesListItemsBydDistrictId(
        districtId!,
      ),
      queryFn: () =>
        AdminElectoralConstituencyApi.getConstituenciesListItemsBydDistrictId(
          districtId!,
        ),
      refetchOnMount: true,
      staleTime: 5 * 60 * 1000,
      enabled: districtId != null,
    }),
  getConstituencyByConstituencyId: (constituencyId: number) =>
    useQuery({
      queryKey: ADMIN_CONSTITUENCY_KEYS.getConstituencyById(constituencyId),
      queryFn: () =>
        AdminElectoralConstituencyApi.getConstituencyById(constituencyId),
      refetchOnMount: true,
      staleTime: 5 * 60 * 1000,
    }),
  getWardAssignmentsByMunicipalityId: (municipalityId: number) =>
    useQuery({
      queryKey:
        ADMIN_CONSTITUENCY_KEYS.getWardAssignmentsByMunicipalityId(
          municipalityId,
        ),
      queryFn: () =>
        AdminElectoralConstituencyApi.getWardAssignmentsByMunicipalityId(
          municipalityId,
        ),
      refetchOnMount: true,
      staleTime: 5 * 60 * 1000,
    }),
  getUnassignedWards: () =>
    useQuery({
      queryKey: ADMIN_CONSTITUENCY_KEYS.getUnassignedWards,
      queryFn: AdminElectoralConstituencyApi.getUnassignedWards,
      refetchOnMount: true,
      staleTime: 5 * 60 * 1000,
    }),
};

export const useAdminConstituencyMutation = () => {
  const invalidateConstituencies = refreshConstituencies();
  const invalidateWardAssignments = (municipalityId: number) =>
    refreshWardAssignmentsByMunicipalityId(municipalityId);

  const addConstituency = useMutation({
    mutationFn: (constituencyRequest: AddConstituencyRequest) =>
      AdminElectoralConstituencyApi.addConstituency(constituencyRequest),
    onSuccess: invalidateConstituencies,
  });

  const updateConstituency = useMutation({
    mutationFn: (constituencyRequest: EditConstituencyRequest) =>
      AdminElectoralConstituencyApi.editConstituency(constituencyRequest),
    onSuccess: invalidateConstituencies,
  });

  const reassignWard = useMutation({
    mutationFn: (reassignRequest: ReassignWardRequest) =>
      AdminElectoralConstituencyApi.reassignWard(reassignRequest),
    onSuccess: (_, reassignRequest) =>
      invalidateWardAssignments(reassignRequest.municipalityId),
  });

  return {
    addConstituency,
    updateConstituency,
    reassignWard,
  };
};

const refreshConstituencies = () => {
  const queryClient = useQueryClient();

  return async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ADMIN_CONSTITUENCY_KEYS.getConstituencies,
      }),
      queryClient.invalidateQueries({
        queryKey: ADMIN_CONSTITUENCY_KEYS.getConstituenciesDropdown,
      }),
    ]);
    console.log("All constituency data refreshed!");
  };
};

const refreshWardAssignmentsByMunicipalityId = (municipalityId: number) => {
  if (municipalityId == 0) return;
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey:
        ADMIN_CONSTITUENCY_KEYS.getWardAssignmentsByMunicipalityId(
          municipalityId,
        ),
    });
};
