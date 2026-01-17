import {useMutation, useQuery} from "@tanstack/react-query";
import {AdminPoliticalPartyApi} from "@/features/admin/political-parties/api/admin.political-parties.api.ts";
import type {
    AddEditPoliticalPartyRequest
} from "@/features/admin/political-parties/types/admin.political-parties.types.ts";

export const ADMIN_POLITICAL_PARTY_KEYS = {
    getPoliticalParties: ['getPoliticalParties'] as const,
    getPoliticalParty: (id:number) => ['getPoliticalParty',id] as const,
    addPoliticalParty: ['addPoliticalParty'] as const,
    editPoliticalParty: ['updatePoliticalParty'] as const,
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
        }),
};

export const useAdminPoliticalPartyMutation =  {
    addPoliticalParty: () =>
        useMutation({
            mutationFn: (party:AddEditPoliticalPartyRequest) => 
                AdminPoliticalPartyApi.addPoliticalParty(party),
        }),
    updatePoliticalParty: () =>
        useMutation({
            mutationFn: (party:AddEditPoliticalPartyRequest) => 
                AdminPoliticalPartyApi.editPoliticalParty(party),
        }),
}