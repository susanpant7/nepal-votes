import { useAuthStore } from "@/stores/useAuthStore.ts";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { ThemeTogglerButton } from "@/components/theme/theme-toggler-button.tsx";
import { adminMenuItems } from "@/features/admin/layout/admin.menu.items.ts";
import { SidebarItem } from "@/features/admin/layout/components/sidebar-item.tsx";
import { useAppNavigation } from "@/hooks/use-app-navivation.ts";

export function AdminSidebar() {
  const userName = useAuthStore.getState().user?.userName;
  const { handleNavigation } = useAppNavigation();
  const onSidebarItemClick = async (url: string) => {
    await handleNavigation(url);
  };
  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b flex items-center px-4">
        <div className="flex items-center gap-3 w-full">
          <ThemeTogglerButton />
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold text-sm">Admin Management</span>
            <span className="text-xs text-muted-foreground">{userName}</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarItem
                    item={item}
                    handleNavigation={(url) => onSidebarItemClick(url)}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
