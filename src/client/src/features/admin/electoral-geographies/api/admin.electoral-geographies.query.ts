import {
  type QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AdminElectoralGeographyApi } from "@/features/admin/electoral-geographies/api/admin.electoral-geographies.api";
import type {
  AddDistrictRequest,
  AddMunicipalityRequest,
  AddProvinceRequest,
  AddVotingPlaceRequest,
  AddWardRequest,
  UpdateDistrictRequest,
  UpdateMunicipalityRequest,
  UpdateProvinceRequest,
  UpdateVotingPlaceRequest,
  UpdateWardRequest,
} from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types";

// --------------------------------------------------
// QUERY KEYS
// --------------------------------------------------
export const QUERY_KEYS = {
  provinces: ["provinces"] as const,
  allDistricts: ["allDistricts"] as const,
  districts: (provinceId: number) => ["districts", provinceId] as const,
  municipalities: (districtId: number) =>
    ["municipalities", districtId] as const,
  wards: (municipalityId: number) => ["wards", municipalityId] as const,
  votingPlaces: (wardId: number) => ["votingPlaces", wardId] as const,
};

// --------------------------------------------------
// QUERIES (params passed at function level)
// --------------------------------------------------
export const useAdminElectoralGeographyQuery = {
  getProvinces: () =>
    useQuery({
      queryKey: QUERY_KEYS.provinces,
      queryFn: AdminElectoralGeographyApi.getProvinces,
      staleTime: 5 * 60 * 1000,
    }),

  getDistricts: () =>
    useQuery({
      queryKey: QUERY_KEYS.allDistricts,
      queryFn: AdminElectoralGeographyApi.getDistricts,
      staleTime: 5 * 60 * 1000,
    }),

  getDistrictsByProvinceId: (provinceId: number) =>
    useQuery({
      queryKey: QUERY_KEYS.districts(provinceId),
      queryFn: () =>
        AdminElectoralGeographyApi.getDistrictsByProvinceId(provinceId),
      enabled: !!provinceId,
    }),

  getMunicipalitiesByDistrictId: (districtId: number | null) =>
    useQuery({
      queryKey: QUERY_KEYS.municipalities(districtId || 0),
      queryFn: () =>
        AdminElectoralGeographyApi.getMunicipalitiesByDistrictId(districtId!),
      enabled: districtId != null,
    }),

  getWardsByMunicipalityId: (municipalityId: number) =>
    useQuery({
      queryKey: QUERY_KEYS.wards(municipalityId),
      queryFn: () =>
        AdminElectoralGeographyApi.getWardsByMunicipalityId(municipalityId),
      enabled: !!municipalityId,
    }),

  getVotingPlacesByWardId: (wardId: number) =>
    useQuery({
      queryKey: QUERY_KEYS.votingPlaces(wardId),
      queryFn: () => AdminElectoralGeographyApi.getVotingPlacesByWardId(wardId),
      enabled: !!wardId,
    }),
};

// --------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------
const refreshProvinces = async (queryClient: QueryClient) => {
  await queryClient.invalidateQueries({
    queryKey: QUERY_KEYS.provinces,
  });
};

const refreshDistrictsOfProvince = async (
  queryClient: QueryClient,
  provinceId: number,
) => {
  await queryClient.invalidateQueries({
    queryKey: QUERY_KEYS.districts(provinceId),
  });
};

const refreshMunicipalitiesByDistrictId = async (
  queryClient: QueryClient,
  districtId: number,
) => {
  await queryClient.invalidateQueries({
    queryKey: QUERY_KEYS.municipalities(districtId),
  });
};

const refreshWardsByMunicipalityId = async (
  queryClient: QueryClient,
  municipalityId: number,
) => {
  await queryClient.invalidateQueries({
    queryKey: QUERY_KEYS.wards(municipalityId),
  });
};

const refreshVotingPlacesByWardId = async (
  queryClient: QueryClient,
  wardId: number,
) => {
  await queryClient.invalidateQueries({
    queryKey: QUERY_KEYS.votingPlaces(wardId),
  });
};

// --------------------------------------------------
// MUTATIONS
// --------------------------------------------------
export const useAdminElectoralGeographyMutation = () => {
  const queryClient = useQueryClient();

  return {
    // ---------- PROVINCES ----------
    addProvince: useMutation({
      mutationFn: (request: AddProvinceRequest) =>
        AdminElectoralGeographyApi.addProvince(request),
      onSuccess: async () => await refreshProvinces(queryClient),
    }),

    updateProvince: useMutation({
      mutationFn: (request: UpdateProvinceRequest) =>
        AdminElectoralGeographyApi.updateProvince(request.provinceId, request),
      onSuccess: async () => await refreshProvinces(queryClient),
    }),

    deleteProvince: useMutation({
      mutationFn: (request: { provinceId: number }) =>
        AdminElectoralGeographyApi.deleteProvince(request.provinceId),
      onSuccess: async () => await refreshProvinces(queryClient),
    }),

    // ---------- DISTRICTS ----------
    addDistrict: useMutation({
      mutationFn: (request: AddDistrictRequest) =>
        AdminElectoralGeographyApi.addDistrict(request),
      onSuccess: async (_, request) =>
        await refreshDistrictsOfProvince(queryClient, request.provinceId),
    }),

    updateDistrict: useMutation({
      mutationFn: (request: UpdateDistrictRequest) =>
        AdminElectoralGeographyApi.updateDistrict(request.districtId, request),
      onSuccess: async (_, request) =>
        await refreshDistrictsOfProvince(queryClient, request.provinceId),
    }),

    deleteDistrict: useMutation({
      mutationFn: (request: { districtId: number; provinceId: number }) =>
        AdminElectoralGeographyApi.deleteDistrict(request.districtId),
      onSuccess: async (_, request) =>
        await refreshDistrictsOfProvince(queryClient, request.provinceId),
    }),

    // ---------- MUNICIPALITIES ----------
    addMunicipality: useMutation({
      mutationFn: (request: AddMunicipalityRequest) =>
        AdminElectoralGeographyApi.addMunicipality(request),
      onSuccess: async (_, request) =>
        await refreshMunicipalitiesByDistrictId(
          queryClient,
          request.districtId,
        ),
    }),

    updateMunicipality: useMutation({
      mutationFn: (request: UpdateMunicipalityRequest) =>
        AdminElectoralGeographyApi.updateMunicipality(
          request.municipalityId,
          request,
        ),
      onSuccess: async (_, request) =>
        await refreshMunicipalitiesByDistrictId(
          queryClient,
          request.districtId,
        ),
    }),

    deleteMunicipality: useMutation({
      mutationFn: (request: { municipalityId: number; districtId: number }) =>
        AdminElectoralGeographyApi.deleteMunicipality(request.municipalityId),
      onSuccess: async (_, request) =>
        await refreshMunicipalitiesByDistrictId(
          queryClient,
          request.districtId,
        ),
    }),

    // ---------- WARDS ----------
    addWard: useMutation({
      mutationFn: (request: AddWardRequest) =>
        AdminElectoralGeographyApi.addWard(request),
      onSuccess: async (_, request) =>
        await refreshWardsByMunicipalityId(queryClient, request.municipalityId),
    }),

    updateWard: useMutation({
      mutationFn: (request: UpdateWardRequest) =>
        AdminElectoralGeographyApi.updateWard(request.wardId, request),
      onSuccess: async (_, request) =>
        await refreshWardsByMunicipalityId(queryClient, request.municipalityId),
    }),

    deleteWard: useMutation({
      mutationFn: (request: { wardId: number; municipalityId: number }) =>
        AdminElectoralGeographyApi.deleteWard(request.wardId),
      onSuccess: async (_, request) =>
        await refreshWardsByMunicipalityId(queryClient, request.municipalityId),
    }),

    // ---------- VOTING PLACES ----------
    addVotingPlace: useMutation({
      mutationFn: (request: AddVotingPlaceRequest) =>
        AdminElectoralGeographyApi.addVotingPlace(request),
      onSuccess: async (_, request) =>
        await refreshVotingPlacesByWardId(queryClient, request.wardId),
    }),

    updateVotingPlace: useMutation({
      mutationFn: (request: UpdateVotingPlaceRequest) =>
        AdminElectoralGeographyApi.updateVotingPlace(
          request.votingPlaceId,
          request,
        ),
      onSuccess: async (_, request) =>
        await refreshVotingPlacesByWardId(queryClient, request.wardId),
    }),

    deleteVotingPlace: useMutation({
      mutationFn: (request: { votingPlaceId: number; wardId: number }) =>
        AdminElectoralGeographyApi.deleteVotingPlace(request.votingPlaceId),
      onSuccess: async (_, request) =>
        await refreshVotingPlacesByWardId(queryClient, request.wardId),
    }),
  };
};
