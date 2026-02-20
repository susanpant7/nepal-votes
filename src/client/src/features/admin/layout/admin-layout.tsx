import { Outlet } from '@tanstack/react-router';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/features/admin/layout/components/admin-sidebar.tsx";
import { ShowHideSidebarButton } from "@/features/admin/layout/components/show-hide-sidebar-button.tsx";

// shows a sidebar and the admin page content
export const AdminLayout = () => {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className="w-full h-screen overflow-hidden flex flex-col">
                {/*this is the show and hide sidebar button*/}
                <div className="flex-none">
                    <ShowHideSidebarButton />
                </div>

                {/*this is the admin's selected page content*/}
                <div className="flex-1 overflow-hidden">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    );
};