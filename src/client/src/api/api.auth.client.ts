import axios from 'axios';
import {APP_SETTINGS} from "@/lib/app.settings.ts";

const serverUrl = import.meta.env.VITE_AUTH_API_BASE_URL || APP_SETTINGS.AUTH_SERVER_URL;

export const apiAuthClient = axios.create({
    baseURL: serverUrl,
    withCredentials: true,
});

apiAuthClient.interceptors.response.use(
    (response) => {
        const { data } = response.data;
        return data;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

export default apiAuthClient;