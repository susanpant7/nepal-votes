import { createFileRoute } from '@tanstack/react-router'
import { UserProfilePage } from "@/features/users/user-profile/pages/user-profile.page.tsx";

export const Route = createFileRoute('/_protected/user-profile')({
  component: UserProfilePage,
})
