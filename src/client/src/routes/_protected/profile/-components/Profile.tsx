import {useAuthStore} from "@/stores/useAuthStore.ts";
import { use } from 'react'
import profileApi from "@/routes/_protected/profile/-api/profile-api.ts";


const userProfilePromise = profileApi.getUserProfile();

const Profile = () => {
    const user = useAuthStore.getState().user;
    const data = use(userProfilePromise)
    
    return (
        <div>
            Hello {user?.userName}
            Your mobile is {user?.mobileNumber}
            
            Your profile:
            {data.votingPlaceAddress}
        </div>
    );
};

export default Profile;