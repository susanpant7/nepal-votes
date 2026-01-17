import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
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
            refetchOnMount: true,
            staleTime: 5 * 60 * 1000,
        }),
    getPartyById: (id:number) =>
        useQuery({
            queryKey: ADMIN_POLITICAL_PARTY_KEYS.getPoliticalParty(id),
            queryFn: () => AdminPoliticalPartyApi.getPoliticalPartyById(id),
            enabled: !!id
        }),
};

export const useAdminPoliticalPartyMutation = () => {
    const invalidateParties = refreshPoliticalParties();

    const addPoliticalParty = useMutation({
        mutationFn: (party: AddEditPoliticalPartyRequest) =>
            AdminPoliticalPartyApi.addPoliticalParty(party),
        onSuccess: invalidateParties,
    });

    const updatePoliticalParty = useMutation({
        mutationFn: (party: AddEditPoliticalPartyRequest) =>
            AdminPoliticalPartyApi.editPoliticalParty(party),
        onSuccess: invalidateParties,
    });

    return {
        addPoliticalParty,
        updatePoliticalParty,
    };
};

const refreshPoliticalParties = () => {
    const queryClient = useQueryClient();

    return () =>
        queryClient.invalidateQueries({
            queryKey: ADMIN_POLITICAL_PARTY_KEYS.getPoliticalParties,
        });
};