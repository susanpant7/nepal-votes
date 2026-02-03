import apiClient from "@/api/api.client.ts";
import type {
  UserRegistrationDetails,
  UserRegistrationListItem,
  UserRegistrationUpdate,
} from "@/features/admin/user-registrations/types/admin.user-registrations.types.ts";
import { ADMIN_USER_REGISTRATION_ENDPOINTS } from "@/features/admin/user-registrations/api/admin.user-registrations.endpoints.ts";

export const AdminUserRegistrationApi = {
  // -------- GET --------

  getRegisteredUsersByDistrictId: async (
    districtId: number,
  ): Promise<UserRegistrationListItem[]> =>
    apiClient.get(
      ADMIN_USER_REGISTRATION_ENDPOINTS.GET_REGISTERED_USERS_BY_DISTRICT(
        districtId,
      ),
    ),

  getRegisteredUsersByUserRegistrationId: async (
    userRegistrationId: number,
  ): Promise<UserRegistrationDetails> =>
    apiClient.get(
      ADMIN_USER_REGISTRATION_ENDPOINTS.GET_REGISTERED_USERS_BY_USER_REGISTRATION_ID(
        userRegistrationId,
      ),
    ),

  // -------- UPDATE --------

  updateUserRegistration: async (
    request: UserRegistrationUpdate,
  ): Promise<boolean> =>
    apiClient.put(
      ADMIN_USER_REGISTRATION_ENDPOINTS.UPDATE_USER_REGISTRATION,
      request,
    ),
};
