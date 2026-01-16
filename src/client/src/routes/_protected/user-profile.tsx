import { createFileRoute } from '@tanstack/react-router'
import { UserProfilePage } from "@/features/user-profile/pages/user-profile.page.tsx";

export const Route = createFileRoute('/_protected/user-profile')({
  component: UserProfilePage,
})
