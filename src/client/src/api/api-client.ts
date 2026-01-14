import axios, { type  InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from "../stores/useAuthStore.ts";
import {notify} from "@/lib/notifications.ts";

const serverUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5119/';

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
            notify.error(errorMessage);
            return Promise.reject(new Error(errorMessage));
        }

        if (message) {
            notify.success(message);
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
            notify.error(errorMessage);
        }

        return Promise.reject(error);
    }
);

export default apiClient;