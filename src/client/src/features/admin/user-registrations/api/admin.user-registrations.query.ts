import { useMutation, useQuery } from "@tanstack/react-query";
import { AdminUserRegistrationApi } from "@/features/admin/user-registrations/api/admin.user-registrations.api.ts";
import type {
  UserRegistrationUpdate,
  UserRegistrationSearchQuery,
} from "@/features/admin/user-registrations/types/admin.user-registrations.types.ts";

// --------------------------------------------------
// QUERY KEYS
// --------------------------------------------------
export const QUERY_KEYS = {
  userRegistrationsSearch: (query: UserRegistrationSearchQuery) =>
    ["userRegistrationsSearch", query] as const,
  userRegistrationsByDistrictId: (districtId: number) =>
    ["userRegistrationsByDistrictId", districtId] as const,
  registeredUsersByUserRegistrationId: (userRegistrationId: number) =>
    ["registeredUsersByUserRegistrationId", userRegistrationId] as const,
};

// --------------------------------------------------
// QUERIES (params passed at function level)
// --------------------------------------------------
export const useAdminUserRegistrationQuery = {
  useSearchRegistrations: (query: UserRegistrationSearchQuery) =>
    useQuery({
      queryKey: QUERY_KEYS.userRegistrationsSearch(query),
      queryFn: () => AdminUserRegistrationApi.searchRegistrations(query),
    }),
  getRegisteredUsersByDistrictId: (districtId: number) =>
    useQuery({
      queryKey: QUERY_KEYS.userRegistrationsByDistrictId(districtId),
      queryFn: () =>
        AdminUserRegistrationApi.getRegisteredUsersByDistrictId(districtId),
      enabled: districtId != null && districtId !== 0,
    }),
  getRegisteredUsersByUserRegistrationId: (userRegistrationId: number) =>
    useQuery({
      queryKey:
        QUERY_KEYS.registeredUsersByUserRegistrationId(userRegistrationId),
      queryFn: () =>
        AdminUserRegistrationApi.getRegisteredUsersByUserRegistrationId(
          userRegistrationId,
        ),
      enabled: userRegistrationId !== 0,
    }),
};

// --------------------------------------------------
// MUTATIONS
// --------------------------------------------------
export const useAdminUserRegistrationMutation = () => {
  return {
    approveRegisteredUser: useMutation({
      mutationFn: (request: UserRegistrationUpdate) =>
        AdminUserRegistrationApi.approveUserRegistration(request),
    }),
    rejectRegisteredUser: useMutation({
      mutationFn: (request: UserRegistrationUpdate) =>
        AdminUserRegistrationApi.rejectUserRegistration(request),
    }),
  };
};
