import { createFileRoute } from "@tanstack/react-router";
import { AdminCandidateSymbolsPage } from "@/features/admin/candidate-symbols/pages/admin.candidate-symbols.page.tsx";

export const Route = createFileRoute("/_admin/admin/candidate-symbols/")({
  component: AdminCandidateSymbolsPage,
});
