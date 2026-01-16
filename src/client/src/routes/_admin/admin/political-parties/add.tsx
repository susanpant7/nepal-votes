import { createFileRoute } from '@tanstack/react-router'
import {
    AdminAddPoliticalPartiesPage
} from "@/features/admin/political-parties/pages/admin.political-parties.page.add.tsx";

export const Route = createFileRoute('/_admin/admin/political-parties/add')({
  component: AdminAddPoliticalPartiesPage,
})
