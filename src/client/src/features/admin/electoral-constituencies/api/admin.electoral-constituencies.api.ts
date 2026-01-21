import apiClient from "@/api/api.client.ts";
import type {
  AddConstituencyRequest,
  ConstituencyInfo,
  EditConstituencyRequest,
} from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import { ADMIN_ELECTORAL_CONSTITUENCIES_ENDPOINTS } from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.endpoints.ts";

export const AdminElectoralConstituencyApi = {
  getConstituencies: async (): Promise<ConstituencyInfo[]> => {
    return await apiClient.get(
      ADMIN_ELECTORAL_CONSTITUENCIES_ENDPOINTS.GET_ELECTORAL_CONSTITUENCIES,
    );
  },
  addConstituency: async (
    constituency: AddConstituencyRequest,
  ): Promise<boolean> => {
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
};
