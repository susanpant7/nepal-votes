import { createFileRoute } from "@tanstack/react-router";
import AdminUsersPageAdd from "@/features/admin/users/pages/admin.users.page.add";

export const Route = createFileRoute("/_admin/admin/users/add")({
    component: AdminUsersPageAdd,
});
