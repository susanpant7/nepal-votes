import apiClient from "@/api/api.client.ts";
import type {
  UserRegistrationReviewDetails,
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
  ): Promise<UserRegistrationReviewDetails> =>
    apiClient.get(
      ADMIN_USER_REGISTRATION_ENDPOINTS.GET_REGISTERED_USERS_BY_USER_REGISTRATION_ID(
        userRegistrationId,
      ),
    ),

  // -------- UPDATE --------

  approveUserRegistration: async (
    request: UserRegistrationUpdate,
  ): Promise<boolean> =>
    apiClient.put(
      ADMIN_USER_REGISTRATION_ENDPOINTS.APPROVE_USER_REGISTRATION,
      request,
    ),

  rejectUserRegistration: async (
    request: UserRegistrationUpdate,
  ): Promise<boolean> =>
    apiClient.put(
      ADMIN_USER_REGISTRATION_ENDPOINTS.REJECT_USER_REGISTRATION,
      request,
    ),
};
