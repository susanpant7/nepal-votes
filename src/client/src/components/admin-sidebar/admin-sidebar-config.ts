import {Flag, Home, LayoutDashboard, Map, MapPin, Users} from "lucide-react";

export const adminSidebarItems = [
    {
        title: "Home",
        url: "/",
        icon: Home,
        description: "Exit the admin page. Return to home",
        showOnDashboard: true,
        linkName: "Return Home",
    },
    {
        title: "Dashboard",
        url: "/admin/",
        icon: LayoutDashboard,
        matchExact: true,
    },
    {
        title: "Electoral Geographies",
        url: "/admin/electoral-geographies/",
        linkName: "Manage Electoral Geographies",
        icon: Map,
        description: "Add or edit provinces, districts, municipalities, etc.",
        showOnDashboard: true,
    },    
    {
        title: "Electoral Constituencies",
        url: "/admin/constituencies/",
        icon: MapPin,
        description: "Add or edit electoral constituencies",
        showOnDashboard: true,
        linkName: "Manage Electoral Constituencies",
    },
    {
        title: "Political Parties",
        url: "/admin/political-parties/",
        icon: Flag,
        description: "Add or edit political parties participating in the elections.",
        showOnDashboard: true,
        linkName: "Manage Political Parties",
    },
    {
        title: "Users",
        url: "/admin/users/",
        icon: Users,
        description: "Add or edit user information for admins, voters, and staff.",
        showOnDashboard: true,
        linkName: "Manage Users",
    }
]