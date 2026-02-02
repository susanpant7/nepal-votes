import { createFileRoute, redirect } from "@tanstack/react-router";
import { UserRegistrationPage } from "@/features/users/user-registration/pages/users.user-registration.page.tsx";
import { useAuthStore } from "@/stores/useAuthStore.ts";

export const Route = createFileRoute("/sign-up/")({
  beforeLoad: async () => {
    const user = useAuthStore.getState().user;
    if (user) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: UserRegistrationPage,
});
