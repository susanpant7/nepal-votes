import {useQuery} from "@tanstack/react-query";
import {AdminPoliticalPartyApi} from "@/features/admin/political-parties/api/admin.political-parties.api.ts";

export const ADMIN_POLITICAL_PARTY_KEYS = {
    getPoliticalParties: ['getPoliticalParties'] as const,
    getPoliticalParty: (id:number) => ['getPoliticalParty',id] as const,
};
export const useAdminPoliticalPartyQuery =  {
    getParties: ()=>
        useQuery({
            queryKey: ADMIN_POLITICAL_PARTY_KEYS.getPoliticalParties,
            queryFn: AdminPoliticalPartyApi.getPoliticalParties,
        }),
    getPartyById: (id:number) =>
        useQuery({
            queryKey: ADMIN_POLITICAL_PARTY_KEYS.getPoliticalParty(id),
            queryFn: () => AdminPoliticalPartyApi.getPoliticalPartyById(id),
            enabled: !!id
        })
};