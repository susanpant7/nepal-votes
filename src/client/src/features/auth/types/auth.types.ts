// domains



// requests
export interface OtpRequest {
    mobileNumber: string;
}

export interface LoginRequest extends OtpRequest {
    providedOtp: string;
}

//responses
export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
}
