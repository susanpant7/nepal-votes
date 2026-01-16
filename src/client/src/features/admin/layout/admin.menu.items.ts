import {Flag, Home, LayoutDashboard, Map, MapPin} from "lucide-react";
import {ROUTES} from "@/lib/app.routes.urls.ts";

export interface AdminNavItem {
    url: string;
    icon: any;
    label: string;
    matchExact?: boolean;
}
export const adminMenuItems : AdminNavItem[] = [
    {
        label: "Home",
        url: ROUTES.HOME,
        icon: Home,
    },
    {
        label: "Dashboard",
        url: ROUTES.ADMIN_DASHBOARD,
        icon: LayoutDashboard,
        matchExact: true,
    },
    {
        label: "Electoral Geographies",
        url: ROUTES.ADMIN_ELECTORAL_GEOGRAPHIES,
        icon: Map,
    },
    {
        label: "Electoral Constituencies",
        url: ROUTES.ADMIN_ELECTORAL_CONSTITUENCIES,
        icon: MapPin,
    },
    {
        label: "Political Parties",
        url: ROUTES.ADMIN_POLITICAL_PARTIES,
        icon: Flag,
    },
]