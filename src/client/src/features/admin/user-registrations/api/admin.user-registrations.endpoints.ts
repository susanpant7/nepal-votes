export const ADMIN_USER_REGISTRATION_ENDPOINTS = {
  GET_REGISTERED_USERS_BY_DISTRICT: (districtId: number) =>
    `/api/registered-users/by-district/${districtId}`,
  GET_REGISTERED_USERS_BY_USER_REGISTRATION_ID: (userRegistrationId: number) =>
    `/api/registered-users?userRegistrationId=${userRegistrationId}`,
  UPDATE_USER_REGISTRATION: `/api/registered-users/`,
} as const;
