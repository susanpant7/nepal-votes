import { createFileRoute } from '@tanstack/react-router'
import {
  AdminElectoralGeographiesPage
} from "@/features/admin/electoral-geographies/pages/admin.electoral-geographies.page.tsx";

export const Route = createFileRoute('/_admin/admin/electoral-geographies/')({
  component: AdminElectoralGeographiesPage,
})

