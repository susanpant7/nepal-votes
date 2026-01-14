import {useQuery} from "@tanstack/react-query";
import ProfileApi from "@/routes/_protected/profile/-api/profile-api.ts";

export const PROFILE_KEYS = {
    profile: ['userProfile'] as const,
};

export const useProfileQuery = () => {
    return useQuery({
        queryKey: PROFILE_KEYS.profile,
        queryFn: ProfileApi.getUserProfile,
    });
};