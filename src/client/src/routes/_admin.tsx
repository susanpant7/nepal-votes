import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import {useAuthStore} from "@/stores/useAuthStore.ts";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AdminSidebar} from "@/components/admin-sidebar/admin-sidebar.tsx";

export const Route = createFileRoute('/_admin')({
    beforeLoad: async () => {
        const user = useAuthStore.getState().user;
        if (!user) {
            throw redirect({
                to: '/',
            })
        }
    },
    component: AdminComponent,
})

function AdminComponent() {
  return (
      <SidebarProvider>
          <AdminSidebar />
          <main>
              <SidebarTrigger />
              <div className="p-5">
                <Outlet />
              </div>
          </main>
      </SidebarProvider>
  )
}
