import {useQuery} from "@tanstack/react-query";
import {UserSearchApi} from "@/features/users/user-search/api/user-search.api.ts";

const USER_SEARCH_KEYS = {
    search: ['userSearch'] as const,
};

export const useUserSearchQuery = (query:string) => {
    return useQuery({
        queryKey: [...USER_SEARCH_KEYS.search, query],
        queryFn: () => UserSearchApi.getUsersBySearchText(query),
        enabled: query.length > 0
    });
};