import apiClient from "@/api/api.client.ts";
import type {UserSearchResponse} from "@/features/users/user-search/types/user-search.types.ts";
import {USER_SEARCH_ENDPOINTS} from "@/features/users/user-search/api/user-search.endpoints.ts";

export const UserSearchApi = {
    getUsersBySearchText: async (query:string): Promise<UserSearchResponse[]> => {
        return await apiClient.get(USER_SEARCH_ENDPOINTS.SEARCH_USERS,
            {
                params: {
                    query: query,
                }
            });
    },
}