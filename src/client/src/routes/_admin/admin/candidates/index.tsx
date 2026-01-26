import { createFileRoute } from "@tanstack/react-router";
import { AdminCandidatesPage } from "@/features/admin/candidates/pages/admin.candidates.page.tsx";

export const Route = createFileRoute("/_admin/admin/candidates/")({
  component: AdminCandidatesPage,
});
