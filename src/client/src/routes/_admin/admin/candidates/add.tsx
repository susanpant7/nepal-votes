import { createFileRoute } from "@tanstack/react-router";
import { AdminCandidatePageAdd } from "@/features/admin/candidates/pages/admin.candidates.page.add.tsx";

export const Route = createFileRoute("/_admin/admin/candidates/add")({
  component: AdminCandidatePageAdd,
});
