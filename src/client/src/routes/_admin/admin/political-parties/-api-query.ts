import {useQuery} from "@tanstack/react-query";
import {PoliticalPartyApi} from "@/routes/_admin/admin/political-parties/-api.ts";

export const POLITICAL_PARTY_KEYS = {
    getPoliticalParties: ['getPoliticalParties'] as const,
    getPoliticalParty: (id:number) => ['getPoliticalParty',id] as const,
};
export const usePoliticalPartyQuery =  {
    getParties: ()=>
        useQuery({
            queryKey: POLITICAL_PARTY_KEYS.getPoliticalParties,
            queryFn: PoliticalPartyApi.getPoliticalParties,
    }),
    getPartyById: (id:number) => 
        useQuery({
            queryKey: POLITICAL_PARTY_KEYS.getPoliticalParty(id),
            queryFn: () => PoliticalPartyApi.getPoliticalPartyById(id),
            enabled: !!id
    })
};