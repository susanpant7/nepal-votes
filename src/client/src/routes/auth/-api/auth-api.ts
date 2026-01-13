import apiClient from "@/api/apiClient.ts";
import authApiClient from "@/api/authApiClient.ts";

export interface OtpRequest {
    mobileNumber: string;
}

export interface VerifyOtpRequest {
    mobileNumber: string;
    providedOtp: string;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
}

const AuthApi = {
    getOtp: async (payload: OtpRequest): Promise<boolean> => {
        return await apiClient.post('/api/auth/generate-otp', payload);
    },
    login: async (payload: VerifyOtpRequest): Promise<TokenResponse> => {
        return await authApiClient.post('/api/auth/login', payload)
    }
}
export default AuthApi;