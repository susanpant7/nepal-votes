import {createFileRoute, redirect} from '@tanstack/react-router'
import {useAuthStore} from "@/stores/useAuthStore.ts";

export const Route = createFileRoute('/_admin')({
    beforeLoad: async () => {
        const user = useAuthStore.getState().user;
        if (!user?.isAdmin) {
            throw redirect({
                to: '/',
            })
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin"!</div>
}
