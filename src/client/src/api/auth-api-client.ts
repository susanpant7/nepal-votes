import axios from 'axios';

const serverUrl = import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:5119/';

export const authApiClient = axios.create({
    baseURL: serverUrl,
    withCredentials: true,
});

authApiClient.interceptors.response.use(
    (response) => {
        const { data } = response.data;
        return data;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

export default authApiClient;