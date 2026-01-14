import {useAuthStore} from "@/stores/useAuthStore.ts";

const Profile = () => {
    const user = useAuthStore.getState().user;
    
    return (
        <div>
            Hello {user?.userName}
            Your mobile is {user?.mobileNumber}
            
            Your profile:
        </div>
    );
};

export default Profile;