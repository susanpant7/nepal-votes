import { useMatchRoute } from "@tanstack/react-router";
import type { AdminNavItem } from "@/features/admin/layout/admin.menu.items.ts";
import { SidebarMenuButton } from "@/components/ui/sidebar.tsx";

export const SidebarItem = ({
  item,
  handleNavigation,
}: {
  item: AdminNavItem;
  handleNavigation: (url: string) => void;
}) => {
  const matchRoute = useMatchRoute();

  // 1. Determine active status safely using the hook
  const isActive = !!matchRoute({
    to: item.url,
    fuzzy: !item.matchExact,
  });

  const activeClasses =
    "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium";
  const inactiveClasses =
    "text-muted-foreground hover:bg-accent hover:text-accent-foreground";

  return (
    <SidebarMenuButton asChild>
      <div
        onClick={() => {
          handleNavigation(item.url);
        }}
        className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md transition-colors ${
          isActive ? activeClasses : inactiveClasses
        }`}
      >
        <item.icon className="h-4 w-4" />
        <span>{item.label}</span>
      </div>
    </SidebarMenuButton>
  );
};
