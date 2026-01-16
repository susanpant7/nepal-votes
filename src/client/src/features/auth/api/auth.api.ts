import type {OtpRequest, TokenResponse, LoginRequest} from "@/features/auth/types/auth.types.ts";
import apiClient from "@/api/api.client.ts";
import apiAuthClient from "@/api/api.auth.client.ts";
import {AUTH_ENDPOINTS} from "@/features/auth/api/auth.endpoints.ts";

export const AuthApi = {
    getOtp: async (payload: OtpRequest): Promise<boolean> => {
        return await apiClient.post(AUTH_ENDPOINTS.GET_OTP, payload);
    },
    login: async (payload: LoginRequest): Promise<TokenResponse> => {
        return  await apiAuthClient.post(AUTH_ENDPOINTS.LOGIN, payload)
    },
    refreshToken: async ():Promise<TokenResponse> => {
        return await apiAuthClient.get(AUTH_ENDPOINTS.REFRESH_TOKEN);
    },
    logout: async ():Promise<boolean> => {
        return await apiAuthClient.get(AUTH_ENDPOINTS.LOGOUT);
    }
}