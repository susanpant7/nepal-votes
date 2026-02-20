export const ADMIN_USER_REGISTRATION_ENDPOINTS = {
  GET_REGISTERED_USERS_BY_DISTRICT: (districtId: number) =>
    `/api/registered-users/by-district/${districtId}`,
  SEARCH_REGISTERED_USERS: `/api/registered-users/search`,
  GET_REGISTERED_USERS_BY_USER_REGISTRATION_ID: (userRegistrationId: number) =>
    `/api/registered-users?userRegistrationId=${userRegistrationId}`,
  APPROVE_USER_REGISTRATION: `/api/registered-users/approve`,
  REJECT_USER_REGISTRATION: `/api/registered-users/reject`,
} as const;
