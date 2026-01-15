import {useQuery} from "@tanstack/react-query";
import {PoliticalPartyApi} from "@/routes/_admin/admin/political-parties/-api.ts";

export const POLITICAL_PARTY_KEYS = {
    getPoliticalParties: ['getPoliticalParties'] as const,
};
export const usePoliticalPartyQuery = () => {
    return useQuery({
        queryKey: POLITICAL_PARTY_KEYS.getPoliticalParties,
        queryFn: PoliticalPartyApi.getPoliticalParties,
    });
};