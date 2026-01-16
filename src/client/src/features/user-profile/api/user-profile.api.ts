import type {UserProfile} from "@/routes/_protected/profile/-api/profile-api.ts";
import {USER_PROFILE_ENDPOINTS} from "@/features/user-profile/api/user-profile.endpoints.ts";
import apiClient from "@/api/api.client.ts";

export const UserProfileApi = {
    getUserProfile: async (): Promise<UserProfile> => {
        return await apiClient.get(USER_PROFILE_ENDPOINTS.GET_PROFILE);
    },

}