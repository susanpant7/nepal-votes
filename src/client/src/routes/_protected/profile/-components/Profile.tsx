import {useAuthStore} from "@/stores/useAuthStore.ts";
import { use, Suspense } from 'react'

function fetchData() {
    return fetch('https://api.example.com/data')
        .then(response => response.json());
}

const dataPromise = fetchData()

const Profile = () => {
    const user = useAuthStore.getState().user;
    const data = use(dataPromise)
    return (
        <div>
            Hello {user?.userName}
            Your mobile is {user?.mobileNumber}
        </div>
    );
};

export default Profile;