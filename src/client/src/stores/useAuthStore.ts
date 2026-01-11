import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode'

export interface User {
    id: string
    mobileNumber: string
    email: string
    role: string[]
    isAdmin: boolean
}

interface JwtPayload {
    sub: string  
    email: string
    mobileNumber: string
    role: string[]
    exp: number
}

interface AuthState {
    accessToken: string | null
    user: User | null
    login: (token: string) => void
    logout: () => void
    loginAsAdmin: () => void
    loginAsUser: () => void
}

export const useAuthStore = create<AuthState>((set)=>({
    accessToken: null,
    user: null,
    
    login: (token: string) => {
        const decoded = jwtDecode<JwtPayload>(token)

        const user: User = {
            id: decoded.sub,
            email: decoded.email,
            mobileNumber: decoded.mobileNumber,
            role: decoded.role,
            isAdmin: decoded.role.includes("Admin")
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
    
    loginAsAdmin: () => 
        set({
            accessToken:"admin-token",
            user:{
                id: 'admin-1',
                email: 'admin@example.com',
                mobileNumber: '9999999999',
                role: ['Admin'],
                isAdmin: true
            }
        }),
    loginAsUser: () =>
        set({
            accessToken:"user-token",
            user:{
                id: 'user-1',
                email: 'user@example.com',
                mobileNumber: '8888888888',
                role: ['User'],
                isAdmin: false
            }
        })
}));