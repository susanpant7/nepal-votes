import apiClient from "@/api/api.client.ts";
import {
    ADMIN_POLITICAL_PARTY_ENDPOINTS
} from "@/features/admin/political-parties/api/admin.political-parties.endpoints.ts";
import type {
    AddEditPoliticalPartyRequest,
    PoliticalPartyInfo
} from "@/features/admin/political-parties/types/admin.political-parties.types.ts";

export const AdminPoliticalPartyApi = {
    getPoliticalParties: async () : Promise<PoliticalPartyInfo[]> => {
        return await apiClient.get(ADMIN_POLITICAL_PARTY_ENDPOINTS.GET_POLITICAL_PARTIES);
    },
    getPoliticalPartyById: async (id:number) : Promise<PoliticalPartyInfo> => {
        return await apiClient.get(ADMIN_POLITICAL_PARTY_ENDPOINTS.GET_POLITICAL_PARTY_BY_ID(id));
    },
    addPoliticalParty: async (party:AddEditPoliticalPartyRequest) : Promise<boolean> => {
        const formData = buildPoliticalPartyFormData(party);
        return await apiClient.post(ADMIN_POLITICAL_PARTY_ENDPOINTS.ADD_POLITICAL_PARTY, 
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    },
    editPoliticalParty: async (party:AddEditPoliticalPartyRequest) : Promise<PoliticalPartyInfo> => {
        const formData = buildPoliticalPartyFormData(party);
        return await apiClient.put(ADMIN_POLITICAL_PARTY_ENDPOINTS.EDIT_POLITICAL_PARTY,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    }
}

const buildPoliticalPartyFormData = (
    party: AddEditPoliticalPartyRequest
): FormData => {
    const formData = new FormData();

    formData.append("PoliticalPartyName", party.politicalPartyName);
    formData.append("PartyLeaderId", party.partyLeaderId.toString());
    
    if (party.politicalPartyId > 0) {
        formData.append(
            "PoliticalPartyId",
            party.politicalPartyId.toString()
        );
    }

    if (party.partySymbolContent instanceof File) {
        formData.append(
            "PartySymbolFile",
            party.partySymbolContent
        );
    }

    return formData;
};
