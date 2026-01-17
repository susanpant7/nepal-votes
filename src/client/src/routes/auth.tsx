import {createFileRoute, redirect} from '@tanstack/react-router'
import {useAuthStore} from "@/stores/useAuthStore.ts";
import {AuthPage} from "@/features/auth/pages/auth.page.tsx";

export const Route = createFileRoute('/auth')({
  beforeLoad: async () => {
    const user = useAuthStore.getState().user;
    if (user) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: AuthPage,
})
