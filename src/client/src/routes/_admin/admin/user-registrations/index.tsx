import { createFileRoute } from "@tanstack/react-router";
import { AdminUserRegistrationsPage } from "@/features/admin/user-registrations/pages/admin.user-registrations.page.tsx";

export const Route = createFileRoute("/_admin/admin/user-registrations/")({
  component: AdminUserRegistrationsPage,
});
