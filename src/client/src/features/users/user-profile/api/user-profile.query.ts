import {useQuery} from "@tanstack/react-query";
import {UserProfileApi} from "@/features/users/user-profile/api/user-profile.api.ts";

const USER_PROFILE_KEYS = {
    profile: ['userProfile'] as const,
};

export const userProfileQuery = () => {
    return useQuery({
        queryKey: USER_PROFILE_KEYS.profile,
        queryFn: UserProfileApi.getUserProfile,
    });
};