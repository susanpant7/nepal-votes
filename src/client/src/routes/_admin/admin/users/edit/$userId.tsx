import { createFileRoute } from '@tanstack/react-router'
import AddUserForm from "@/features/admin/users/components/add-user.form";

export const Route = createFileRoute('/_admin/admin/users/edit/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = Route.useParams()
  return (
    <AddUserForm userId={Number(userId)} />
  )
}
