import { LayoutDashboard, ShieldCheck, User, Home } from "lucide-react";
import type {User as sessionUser} from "@/stores/useAuthStore.ts";

export type NavItem = {
    label: string;
    href: string;
    icon: any;
};

export const getNavItems = (user: sessionUser | null): NavItem[] => {
    const publicItems: NavItem[] = [
        { label: "Home", href: "/", icon: Home },
    ];

    const privateItems: NavItem[] = [
        { label: "Profile", href: "/profile", icon: User },
        { label: "My Votes", href: "/my-votes", icon: LayoutDashboard },
    ];

    const adminItems: NavItem[] = [
        { label: "Admin Panel", href: "/admin", icon: ShieldCheck },
    ];
    if (user?.isAdmin) return [...publicItems, ...privateItems, ...adminItems];
    if (user) return [...publicItems, ...privateItems];
    return [...publicItems];
};