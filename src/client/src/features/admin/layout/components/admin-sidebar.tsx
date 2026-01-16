import {useAuthStore} from "@/stores/useAuthStore.ts";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar.tsx";
import {Link} from "@tanstack/react-router";
import {ThemeTogglerButton} from "@/components/theme/theme-toggler-button.tsx";
import {adminMenuItems} from "@/features/admin/layout/admin.menu.items.ts";

export function AdminSidebar() {
    const userName = useAuthStore.getState().user?.userName;

    return (
        <Sidebar>

            <SidebarHeader className="h-16 border-b flex items-center px-4">
                <div className="flex items-center gap-3 w-full">
                    <ThemeTogglerButton />
                    <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-semibold text-sm">
                            Admin Management
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {userName}
                        </span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {adminMenuItems.map((item) => (

                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}
                                              activeOptions={{ exact: item.matchExact }}
                                              activeProps={{
                                                  className: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium"
                                              }}
                                        >
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

        </Sidebar>
    )
}