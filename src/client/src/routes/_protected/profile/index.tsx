import { createFileRoute } from '@tanstack/react-router'
import Profile from "@/routes/_protected/profile/-components/Profile.tsx";

export const Route = createFileRoute('/_protected/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Profile />
}
