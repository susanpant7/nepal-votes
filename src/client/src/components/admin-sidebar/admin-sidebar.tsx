import {
    Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";
import {Link} from "@tanstack/react-router";
import {useAuthStore} from "@/stores/useAuthStore.ts";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {adminSidebarItems} from "@/components/admin-sidebar/admin-sidebar-config.ts";

export function AdminSidebar() {
    const userName = useAuthStore.getState().user?.userName;
    
    return (
        <Sidebar>

            <SidebarHeader className="h-16 border-b flex items-center px-4">
                <div className="flex items-center gap-3 w-full">
                    <ModeToggle />
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
                            {adminSidebarItems.map((item) => (
                                
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}
                                              activeOptions={{ exact: item.matchExact }}
                                              activeProps={{
                                                  className: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium"
                                              }}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
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