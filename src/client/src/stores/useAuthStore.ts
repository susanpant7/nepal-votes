import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode'
import {ClaimType} from "@/lib/claims.ts";

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
    login: (token: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set)=>({
    accessToken: null,
    user: null,
    
    login: (token: string) => {
        const decoded = jwtDecode<JwtPayload>(token)
        let roles = getRolesFromToken(decoded);
        const user: User = {
            userId: decoded[ClaimType.USER_ID] as number,
            userName: decoded[ClaimType.NAME] as string,
            mobileNumber: decoded[ClaimType.PHONE] as string,
            email: "",
            role: roles,
            isAdmin: roles.includes("ADMIN") || roles.includes("SUPER_ADMIN"),
        }

        set({
            accessToken: token,
            user,
        })
    },
    logout: () =>
        set({
            accessToken: null,
            user: null,
        }),
}));

const getRolesFromToken = (decoded: any): string[] => {
    const role =
        decoded[ClaimType.ROLE]

    if (!role) return []
    return Array.isArray(role) ? role : [role]
}