import {useMutation, useQuery} from "@tanstack/react-query";
import {
    AdminElectoralGeographyApi
} from "@/features/admin/electoral-geographies/api/admin.electoral-geographies.api.ts";
import type {
    AddDistrictRequest, AddMunicipalityRequest,
    AddProvinceRequest,
    AddVotingPlaceRequest, AddWardRequest, UpdateDistrictRequest, UpdateMunicipalityRequest, UpdateProvinceRequest,
    UpdateVotingPlaceRequest,
    UpdateWardRequest
} from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";

export const ADMIN_ELECTORAL_GEOGRAPHY_KEYS = {
    provinces: ['provinces'] as const,
    districts: (provinceId: number) => ['districts', provinceId] as const,
    municipalities: (districtId: number) => ['municipalities', districtId] as const,
    wards: (municipalityId: number) => ['wards', municipalityId] as const,
    votingPlaces: (wardId: number) => ['votingPlaces', wardId] as const,
};


export const useAdminElectoralGeographyQuery = {
    getProvinces: () =>
        useQuery({
            queryKey: ADMIN_ELECTORAL_GEOGRAPHY_KEYS.provinces,
            queryFn: AdminElectoralGeographyApi.getProvinces,
            refetchOnMount: true,
            staleTime: 5 * 60 * 1000,
        }),

    getDistrictsByProvinceId: (provinceId: number) =>
        useQuery({
            queryKey: ADMIN_ELECTORAL_GEOGRAPHY_KEYS.districts(provinceId),
            queryFn: () =>
                AdminElectoralGeographyApi.getDistrictsByProvinceId(provinceId),
            enabled: !!provinceId,
        }),

    getMunicipalitiesByDistrictId: (districtId: number) =>
        useQuery({
            queryKey: ADMIN_ELECTORAL_GEOGRAPHY_KEYS.municipalities(districtId),
            queryFn: () =>
                AdminElectoralGeographyApi.getMunicipalitiesByDistrictId(districtId),
            enabled: !!districtId,
        }),

    getWardsByMunicipalityId: (municipalityId: number) =>
        useQuery({
            queryKey: ADMIN_ELECTORAL_GEOGRAPHY_KEYS.wards(municipalityId),
            queryFn: () =>
                AdminElectoralGeographyApi.getWardsByMunicipalityId(municipalityId),
            enabled: !!municipalityId,
        }),

    getVotingPlacesByWardId: (wardId: number) =>
        useQuery({
            queryKey: ADMIN_ELECTORAL_GEOGRAPHY_KEYS.votingPlaces(wardId),
            queryFn: () =>
                AdminElectoralGeographyApi.getVotingPlacesByWardId(wardId),
            enabled: !!wardId,
        }),
};

export const useAdminElectoralGeographyMutation = () => {
    return {
        // -------- PROVINCES --------
        addProvince: useMutation({
            mutationFn: (request: AddProvinceRequest) =>
                AdminElectoralGeographyApi.addProvince(request),
        }),
        updateProvince: useMutation({
            mutationFn: ({ provinceId, request }: { provinceId: number; request: UpdateProvinceRequest }) =>
                AdminElectoralGeographyApi.updateProvince(provinceId, request),
        }),

        // -------- DISTRICTS --------
        addDistrict: useMutation({
            mutationFn: (request: AddDistrictRequest) =>
                AdminElectoralGeographyApi.addDistrict(request),
        }),
        updateDistrict: useMutation({
            mutationFn: ({ districtId, request }: { districtId: number; request: UpdateDistrictRequest }) =>
                AdminElectoralGeographyApi.updateDistrict(districtId, request),
        }),

        // -------- MUNICIPALITIES --------
        addMunicipality: useMutation({
            mutationFn: (request: AddMunicipalityRequest) =>
                AdminElectoralGeographyApi.addMunicipality(request),
        }),
        updateMunicipality: useMutation({
            mutationFn: ({ municipalityId, request }: { municipalityId: number; request: UpdateMunicipalityRequest }) =>
                AdminElectoralGeographyApi.updateMunicipality(municipalityId, request),
        }),

        // -------- WARDS --------
        addWard: useMutation({
            mutationFn: (request: AddWardRequest) =>
                AdminElectoralGeographyApi.addWard(request),
        }),
        updateWard: useMutation({
            mutationFn: ({ wardId, request }: { wardId: number; request: UpdateWardRequest }) =>
                AdminElectoralGeographyApi.updateWard(wardId, request),
        }),

        // -------- VOTING PLACES --------
        addVotingPlace: useMutation({
            mutationFn: (request: AddVotingPlaceRequest) =>
                AdminElectoralGeographyApi.addVotingPlace(request),
        }),
        updateVotingPlace: useMutation({
            mutationFn: ({ votingPlaceId, request }: { votingPlaceId: number; request: UpdateVotingPlaceRequest }) =>
                AdminElectoralGeographyApi.updateVotingPlace(votingPlaceId, request),
        }),
    };
};
