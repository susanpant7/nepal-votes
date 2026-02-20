import { createFileRoute, Navigate } from '@tanstack/react-router'
import AddUserForm from "@/features/admin/users/components/add-user.form";
import { usePermissions } from '@/hooks/use-permissions';
import { ROUTES } from '@/lib/app.routes.urls';

export const Route = createFileRoute('/_admin/admin/users/edit/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isSuperAdmin } = usePermissions();
  const { userId } = Route.useParams()

  if (!isSuperAdmin) {
    return <Navigate to={ROUTES.ADMIN_DASHBOARD} />;
  }

  return (
    <AddUserForm userId={Number(userId)} />
  )
}
