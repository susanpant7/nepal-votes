import apiClient from "@/api/api.client.ts";
import { ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS } from "@/features/admin/electoral-geographies/api/admin.electoral-geographies.endpoints.ts";
import type {
  AddDistrictRequest,
  AddMunicipalityRequest,
  AddProvinceRequest,
  AddVotingPlaceRequest,
  AddWardRequest,
  DistrictInfo,
  MunicipalityInfo,
  ProvinceInfo,
  UpdateDistrictRequest,
  UpdateMunicipalityRequest,
  UpdateProvinceRequest,
  UpdateVotingPlaceRequest,
  UpdateWardRequest,
  VotingPlaceInfo,
  WardInfo,
} from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";

export const AdminElectoralGeographyApi = {
  // -------- GET --------

  getProvinces: async (): Promise<ProvinceInfo[]> =>
    apiClient.get(ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.GET_PROVINCES),

  getDistricts: async (): Promise<DistrictInfo[]> =>
    apiClient.get(ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.GET_ALL_DISTRICTS),

  getDistrictsByProvinceId: async (
    provinceId: number,
  ): Promise<DistrictInfo[]> =>
    apiClient.get(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.GET_DISTRICTS_BY_PROVINCE_ID(
        provinceId,
      ),
    ),

  getMunicipalitiesByDistrictId: async (
    districtId: number,
  ): Promise<MunicipalityInfo[]> =>
    apiClient.get(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.GET_MUNICIPALITIES_BY_DISTRICT_ID(
        districtId,
      ),
    ),

  getWardsByMunicipalityId: async (
    municipalityId: number,
  ): Promise<WardInfo[]> =>
    apiClient.get(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.GET_WARDS_BY_MUNICIPALITY_ID(
        municipalityId,
      ),
    ),

  getVotingPlacesByWardId: async (wardId: number): Promise<VotingPlaceInfo[]> =>
    apiClient.get(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.GET_VOTING_PLACES_BY_WARDS_ID(wardId),
    ),

  // -------- ADD --------

  addProvince: async (request: AddProvinceRequest): Promise<ProvinceInfo> =>
    apiClient.post(ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.ADD_PROVINCE, request),

  addDistrict: async (request: AddDistrictRequest): Promise<DistrictInfo> =>
    apiClient.post(ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.ADD_DISTRICT, request),

  addMunicipality: async (
    request: AddMunicipalityRequest,
  ): Promise<MunicipalityInfo> =>
    apiClient.post(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.ADD_MUNICIPALITY,
      request,
    ),

  addWard: async (request: AddWardRequest): Promise<WardInfo> =>
    apiClient.post(ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.ADD_WARD, request),

  addVotingPlace: async (
    request: AddVotingPlaceRequest,
  ): Promise<VotingPlaceInfo> =>
    apiClient.post(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.ADD_VOTING_PLACE,
      request,
    ),

  // -------- UPDATE --------

  updateProvince: async (
    provinceId: number,
    request: UpdateProvinceRequest,
  ): Promise<ProvinceInfo> =>
    apiClient.put(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.UPDATE_PROVINCE(provinceId),
      request,
    ),

  updateDistrict: async (
    districtId: number,
    request: UpdateDistrictRequest,
  ): Promise<DistrictInfo> =>
    apiClient.put(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.UPDATE_DISTRICT(districtId),
      request,
    ),

  updateMunicipality: async (
    municipalityId: number,
    request: UpdateMunicipalityRequest,
  ): Promise<MunicipalityInfo> =>
    apiClient.put(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.UPDATE_MUNICIPALITY(municipalityId),
      request,
    ),

  updateWard: async (
    wardId: number,
    request: UpdateWardRequest,
  ): Promise<WardInfo> =>
    apiClient.put(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.UPDATE_WARD(wardId),
      request,
    ),

  updateVotingPlace: async (
    votingPlaceId: number,
    request: UpdateVotingPlaceRequest,
  ): Promise<VotingPlaceInfo> =>
    apiClient.put(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.UPDATE_VOTING_PLACE(votingPlaceId),
      request,
    ),

  // -------- DELETE --------

  deleteProvince: async (provinceId: number): Promise<boolean> =>
    apiClient.delete(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.DELETE_PROVINCE(provinceId),
    ),

  deleteDistrict: async (districtId: number): Promise<boolean> =>
    apiClient.delete(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.DELETE_DISTRICT(districtId),
    ),

  deleteMunicipality: async (municipalityId: number): Promise<boolean> =>
    apiClient.delete(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.DELETE_MUNICIPALITY(municipalityId),
    ),

  deleteWard: async (wardId: number): Promise<boolean> =>
    apiClient.delete(ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.DELETE_WARD(wardId)),

  deleteVotingPlace: async (votingPlaceId: number): Promise<boolean> =>
    apiClient.delete(
      ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS.DELETE_VOTING_PLACE(votingPlaceId),
    ),
};
