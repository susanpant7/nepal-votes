import ApiClient from "@/api/api-client.ts";

export interface PoliticalPartyInfo{
    politicalPartyId: number;
    politicalPartyName: string;
    partyLeaderName: string;
    partySymbolContent: string;
    partySymbolContentType: string;
    partySymbolFileName: string;
}
export const PoliticalPartyApi = {
    getPoliticalParties: async () : Promise<PoliticalPartyInfo[]> => {
        return await ApiClient.get("/api/political-parties");
    }
}