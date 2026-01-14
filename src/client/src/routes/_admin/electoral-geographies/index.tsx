import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/electoral-geographies/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/electoral-geographies/"!</div>
}
