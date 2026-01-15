import { createFileRoute } from '@tanstack/react-router'
import PoliticalParty from "@/routes/_admin/admin/political-parties/-PoliticalParty.tsx";

export const Route = createFileRoute('/_admin/admin/political-parties/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PoliticalParty />
}
