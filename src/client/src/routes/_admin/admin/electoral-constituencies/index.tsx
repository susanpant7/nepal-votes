import { createFileRoute } from "@tanstack/react-router";
import { AdminElectoralConstituenciesPage } from "@/features/admin/electoral-constituencies/pages/admin.electoral-constituencies.page.tsx";

export const Route = createFileRoute("/_admin/admin/electoral-constituencies/")(
  {
    component: AdminElectoralConstituenciesPage,
  },
);
