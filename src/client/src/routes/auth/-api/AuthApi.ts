import apiClient from "@/api/apiClient.ts";

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
    expiresAt: string; // DateTimeOffset string
}

const AuthApi = {
    getOtp: async (payload: OtpRequest): Promise<boolean> => {
        return await apiClient.post('/api/auth/generate-otp', payload);
    },
    verifyOtp: async (payload: VerifyOtpRequest): Promise<TokenResponse> => {
        return await apiClient.post('/api/auth/verify-otp', payload)
    }
}
export default AuthApi;