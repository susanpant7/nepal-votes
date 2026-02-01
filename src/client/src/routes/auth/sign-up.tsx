import { createFileRoute } from "@tanstack/react-router";
import { AuthSignUpPage } from "@/features/auth/pages/auth.sign-up.page.tsx";

export const Route = createFileRoute("/auth/sign-up")({
  component: AuthSignUpPage,
});
