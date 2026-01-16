import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode'
import {AuthApi} from "@/features/auth/api/auth.api.ts";
import {ClaimType} from "@/features/auth/constants/auth.constants.ts";

export interface User {
    userId: number
    userName: string
    mobileNumber: string
    email: string
    role: string[]
    isAdmin: boolean
}

interface JwtPayload {
    [ClaimType.NAME]: string
    [ClaimType.USER_ID]: number
    [ClaimType.PHONE]: string
    [ClaimType.ROLE]: string | string[]
    exp: number
    iss: string
    aud: string
}

interface AuthState {
    accessToken: string | null
    user: User | null
    appIsInitializing: boolean
    login: (token: string) => void
    logout: () => void
    refreshAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set,get)=>({
    accessToken: null,
    user: null,
    appIsInitializing: true,
    
    login: (token: string) => {
        const user = createUserFromToken(token);
        set({ accessToken: token, user, appIsInitializing: false });
    },
    logout: () =>
        set({
            accessToken: null,
            user: null,
        }),
    refreshAuth: async (): Promise<void> => {
        try {
            const response = await AuthApi.refreshToken();
            get().login(response.accessToken);
        } catch (error) {
            console.error("error when refreshing auth ", error);
            set({accessToken: null, user: null, appIsInitializing: false});
        }
    },
}));

const getRolesFromToken = (decoded: any): string[] => {
    const role =
        decoded[ClaimType.ROLE]

    if (!role) return []
    return Array.isArray(role) ? role : [role]
}

const createUserFromToken = (token: string): User => {
    const decoded = jwtDecode<JwtPayload>(token);
    let roles = getRolesFromToken(decoded);
    return {
        userId: decoded[ClaimType.USER_ID] as number,
        userName: decoded[ClaimType.NAME] as string,
        mobileNumber: decoded[ClaimType.PHONE] as string,
        email: "",
        role: roles,
        isAdmin: roles.includes("ADMIN") || roles.includes("SUPER_ADMIN"),
    };
};