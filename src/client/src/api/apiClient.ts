import axios from 'axios';
import { useAuthStore } from "../stores/useAuthStore.ts";

const serverUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5119/';

// the default api instance for all app requests
const apiClient = axios.create({
    baseURL: serverUrl,
});

// Dedicated instance ONLY for auth (no interceptors)
// This avoids the "infinite loop" risk entirely
const authApiClient = axios.create({
    baseURL: serverUrl,
    withCredentials: true // to send the Refresh Token cookie
});

// Request Interceptor: Attach the Token
apiClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401s
let refreshTokenPromise: Promise<string> | null = null;

apiClient.interceptors.response.use(
    (response) =>
    {
        const { success, message, data } = response.data;
        if (success !== true) {
            const errorMessage = message || "An error occurred";
            alert(message);
            return Promise.reject(new Error(errorMessage));
        }
        if (message) {
            alert(message);
        }
        return data;
    },
    async (error) => {
        const originalRequest = error.config;

        // Condition: Unauthorized + Not already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // If a refresh is already in progress, wait for it
                if (!refreshTokenPromise) {
                    refreshTokenPromise = refreshTokenAndSave();
                }

                const newToken = await refreshTokenPromise;

                // Update the failed request and replay it
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest);

            } catch (refreshError) {
                // Refresh failed (e.g., refresh token expired) -> Nuke the session
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            } finally {
                refreshTokenPromise = null; // Reset for the next time access expires
            }
        }

        if (error.response) {
            const { message } = error.response.data;
            alert(`Error: ${message}`);
        }
        
        return Promise.reject(error);
    }
);

// Helper function
async function refreshTokenAndSave() {
    const response = await authApiClient.get('api/auth/refresh');
    const { accessToken } = response.data;

    useAuthStore.getState().login(accessToken);
    return accessToken;
}

export default apiClient;