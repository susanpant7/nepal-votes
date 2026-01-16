import apiClient from "@/api/api.client.ts";
import {
    ADMIN_POLITICAL_PARTY_ENDPOINTS
} from "@/features/admin/political-parties/api/admin.political-parties.endpoints.ts";
import type {PoliticalPartyInfo} from "@/features/admin/political-parties/types/admin.political-parties.types.ts";

export const AdminPoliticalPartyApi = {
    getPoliticalParties: async () : Promise<PoliticalPartyInfo[]> => {
        return await apiClient.get(ADMIN_POLITICAL_PARTY_ENDPOINTS.GET_POLITICAL_PARTIES);
    },
    getPoliticalPartyById: async (id:number) : Promise<PoliticalPartyInfo> => {
        return await apiClient.get(ADMIN_POLITICAL_PARTY_ENDPOINTS.GET_POLITICAL_PARTY_BY_ID(id));
    }
}