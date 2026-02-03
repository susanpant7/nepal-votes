import axios, { type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../stores/useAuthStore.ts";
import { showNotification } from "@/components/toaster/toaster.utils.ts";
import { APP_SETTINGS } from "@/lib/app.settings.ts";
import apiAuthClient from "@/api/api.auth.client.ts";
import { AUTH_ENDPOINTS } from "@/features/auth/api/auth.endpoints.ts";

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
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    const { success, message, statusCode, data } = response.data;

    const errorMessage = message || "Some error occurred";
    if (success !== true) {
      showNotification.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }

    //const requestMethod = response.config.method?.toLowerCase();
    if (message && statusCode !== 200) {
      showNotification.success(message);
    }

    return data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      // IF this was already a retry, the new token failed. Logout immediately.
      if (originalRequest._retry) {
        useAuthStore.getState().logout();
        await apiAuthClient.get(AUTH_ENDPOINTS.LOGOUT);
        window.location.href = "/";
        return Promise.reject(error);
      }

      // Standard Refresh Logic for the first 401 encounter
      originalRequest._retry = true;

      try {
        if (!refreshTokenPromise) {
          refreshTokenPromise = useAuthStore.getState().refreshAuth();
        }

        await refreshTokenPromise;
        const newToken = useAuthStore.getState().accessToken;

        if (!newToken) throw new Error("Refresh failed");

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Execute the retry. If this returns 401, it will hit the
        // "if (originalRequest._retry)" block above on the next pass.
        return apiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        refreshTokenPromise = null;
      }
    }

    // Handle other errors
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    showNotification.error(errorMessage);

    return Promise.reject(error);
  },
);

export default apiClient;
