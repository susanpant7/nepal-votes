import { createFileRoute } from "@tanstack/react-router";
import { AdminUsersPage } from "@/features/admin/users/pages/admin.users.page.tsx";

export const Route = createFileRoute("/_admin/admin/users/")({
  component: AdminUsersPage,
});
