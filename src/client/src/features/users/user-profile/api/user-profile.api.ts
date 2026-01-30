import { USER_PROFILE_ENDPOINTS } from "@/features/users/user-profile/api/user-profile.endpoints.ts";
import apiClient from "@/api/api.client.ts";
import type { UserProfile } from "@/features/users/user-profile/types/user-profile.types.ts";

export const UserProfileApi = {
  getUserProfile: async (): Promise<UserProfile> =>
    apiClient.get(USER_PROFILE_ENDPOINTS.GET_PROFILE),
};
