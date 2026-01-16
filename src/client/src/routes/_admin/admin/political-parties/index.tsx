import { createFileRoute } from '@tanstack/react-router'
import {AdminPoliticalPartyPage} from "@/features/admin/political-parties/pages/admin.political-parties.page.tsx";

export const Route = createFileRoute('/_admin/admin/political-parties/')({
  component: AdminPoliticalPartyPage,
})
