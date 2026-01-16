import axios, { type  InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from "../stores/useAuthStore.ts";
import {showNotification} from "@/components/toaster/toaster.utils.ts";
import {APP_SETTINGS} from "@/lib/app.settings.ts";

const serverUrl = import.meta.env.VITE_API_BASE_URL || APP_SETTINGS.SERVER_URL;

export const apiClient = axios.create({
    baseURL: serverUrl,
});

let refreshTokenPromise: Promise<void> | null = null;

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = useAuthStore.getState().accessToken;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => {
        const { success, message, data } = response.data;

        if (success !== true) {
            const errorMessage = message || "Some error occurred";
            showNotification.error(errorMessage);
            return Promise.reject(new Error(errorMessage));
        }

        const requestMethod = response.config.method?.toLowerCase();
        if (message && requestMethod !== 'get') {
            showNotification.success(message);
        }

        return data;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized & Token Refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                if (!refreshTokenPromise) {
                    refreshTokenPromise = useAuthStore.getState().refreshAuth();
                }

                await refreshTokenPromise;
                const newToken = useAuthStore.getState().accessToken;
                if (!newToken) throw new Error("Refresh failed");
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest);

            } catch (refreshError) {
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            } finally {
                refreshTokenPromise = null;
            }
        }

        if (error.response?.status !== 401) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            showNotification.error(errorMessage);
        }

        return Promise.reject(error);
    }
);

export default apiClient;