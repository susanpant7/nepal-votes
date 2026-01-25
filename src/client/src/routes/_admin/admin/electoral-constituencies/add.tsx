import { createFileRoute } from '@tanstack/react-router'
import {
  AdminElectoralConstituenciesPageAdd
} from "@/features/admin/electoral-constituencies/pages/admin.electoral-constituencies.page.add.tsx";

export const Route = createFileRoute(
  '/_admin/admin/electoral-constituencies/add',
)({
  component: AdminElectoralConstituenciesPageAdd,
})

