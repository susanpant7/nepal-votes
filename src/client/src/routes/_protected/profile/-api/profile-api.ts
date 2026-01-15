import apiClient from "@/api/api-client.ts";


export interface UserProfile {
    fullName:string;
    mobileNumber:string;
    votingPlaceAddress:string;
}

const ProfileApi = {
    getUserProfile: async (): Promise<UserProfile> => {
        return await apiClient.get('/api/users/profile');
    },

}
export default ProfileApi;