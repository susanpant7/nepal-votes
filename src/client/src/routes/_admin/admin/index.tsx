import {createFileRoute} from '@tanstack/react-router'
import {AdminDashboardPage} from "@/features/admin/dashboard/pages/admin.dashboard.page.tsx";

export const Route = createFileRoute('/_admin/admin/')({
  component: AdminDashboardPage,
})
