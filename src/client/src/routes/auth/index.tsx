import {createFileRoute, redirect} from '@tanstack/react-router'
import Auth from "./-components/Auth.tsx";
import {useAuthStore} from "@/stores/useAuthStore.ts";

export const Route = createFileRoute('/auth/')({
  beforeLoad: async () => {
    const user = useAuthStore.getState().user;
    if (user) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Auth />
}
