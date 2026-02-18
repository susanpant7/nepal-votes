import { createFileRoute } from "@tanstack/react-router";
import { CandidatePage } from "@/features/candidate/pages/candidate.page.tsx";

export const Route = createFileRoute("/candidate/")({
  component: CandidatePage,
});
