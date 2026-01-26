import apiClient from "@/api/api.client.ts";
import type {
  AddConstituencyRequest,
  ConstituencyDetail,
  ConstituencyDropdown,
  ConstituencyListItem,
  EditConstituencyRequest,
  ProvinceWithDistrictsDetails,
  ReassignWardRequest,
  WardWithConstituency,
} from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import { ADMIN_ELECTORAL_CONSTITUENCIES_ENDPOINTS } from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.endpoints.ts";

export const AdminElectoralConstituencyApi = {
  getConstituenciesDropdown: async (): Promise<ConstituencyDropdown[]> => {
    return await apiClient.get(
      ADMIN_ELECTORAL_CONSTITUENCIES_ENDPOINTS.GET_ELECTORAL_CONSTITUENCIES_DROPDOWN,
    );
  },
  getConstituenciesListItemsBydDistrictId: async (
    districtId: number,
  ): Promise<ConstituencyListItem[]> => {
    return await apiClient.get(
      ADMIN_ELECTORAL_CONSTITUENCIES_ENDPOINTS.GET_ELECTORAL_CONSTITUENCIES_LIST_ITEMS_BY_DISTRICT_ID(
        districtId,
      ),
    );
  },
  getConstituencyById: async (
    constituencyId: number,
  ): Promise<ConstituencyDetail> => {
    return await apiClient.get(
      ADMIN_ELECTORAL_CONSTITUENCIES_ENDPOINTS.GET_ELECTORAL_CONSTITUENCY_BY_CONSTITUENCY_ID(
        constituencyId,
      ),
    );
  },
  getWardAssignmentsByMunicipalityId: async (
    municipalityId: number,
  ): Promise<WardWithConstituency[]> => {
    return await apiClient.get(
      ADMIN_ELECTORAL_CONSTITUENCIES_ENDPOINTS.GET_WARD_ASSIGNMENTS_BY_MUNICIPALITY_ID(
        municipalityId,
      ),
    );
  },
  getUnassignedWards: async (): Promise<ProvinceWithDistrictsDetails[]> => {
    return await apiClient.get(
      ADMIN_ELECTORAL_CONSTITUENCIES_ENDPOINTS.GET_UNASSIGNED_WARDS,
    );
  },
  addConstituency: async (
    constituency: AddConstituencyRequest,
  ): Promise<number> => {
    return await apiClient.post(
      ADMIN_ELECTORAL_CONSTITUENCIES_ENDPOINTS.ADD_ELECTORAL_CONSTITUENCIES,
      constituency,
    );
  },
  editConstituency: async (
    constituency: EditConstituencyRequest,
  ): Promise<boolean> => {
    return await apiClient.put(
      ADMIN_ELECTORAL_CONSTITUENCIES_ENDPOINTS.ADD_ELECTORAL_CONSTITUENCIES,
      constituency,
    );
  },
  reassignWard: async (
    reassignWardRequest: ReassignWardRequest,
  ): Promise<boolean> => {
    return await apiClient.put(
      ADMIN_ELECTORAL_CONSTITUENCIES_ENDPOINTS.REASSIGN_WARD,
      reassignWardRequest,
    );
  },
};
