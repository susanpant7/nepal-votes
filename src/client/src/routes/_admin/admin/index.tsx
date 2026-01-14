import {createFileRoute} from '@tanstack/react-router'
import DashboardCard from "@/routes/_admin/admin/-components/DashboardCard.tsx";
import {adminSidebarItems} from "@/components/admin-sidebar/admin-sidebar-config.ts";

export const Route = createFileRoute('/_admin/admin/')({
  component: AdminLayout,
})

function AdminLayout() {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
                Manage political parties, users, candidates, and other electoral information.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {adminSidebarItems
                    .filter(x => x.showOnDashboard)
                    .map((item, index) => (
                        <DashboardCard
                            key={index}
                            title={item.title}
                            description={item.description||""}
                            linkName={item.linkName||""}
                            linkToUrl={item.url}
                        />
                    ))}

            </div>
        </div>
    )
}

