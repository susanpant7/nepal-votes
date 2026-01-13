import axios from 'axios';
import { useAuthStore } from "../stores/useAuthStore.ts";
import {notify} from "@/lib/notifications.ts";

const serverUrl = import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:5119/';

export const authApiClient = axios.create({
    baseURL: serverUrl,
    withCredentials: true,
});

authApiClient.interceptors.response.use(
    (response)=>{
        const { success, message, data } = response.data;
        if (success !== true) {
            const errorMessage = message || "Some error occurred";
            notify.error(errorMessage);
            return Promise.reject(new Error(errorMessage));
        }

        if (message) {
            notify.success(message);
        }
        
        if(data?.accessToken) {
            useAuthStore.getState().login(data?.accessToken);
            return data.accessToken;
        }
        return data;
    },
    (error) => {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        notify.error(errorMessage);
    }
);

export async function handleTokenRefresh(): Promise<string> {
    return await authApiClient.get('api/auth/refresh');
}

export default authApiClient;