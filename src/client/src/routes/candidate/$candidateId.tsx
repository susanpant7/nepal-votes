import { createFileRoute } from "@tanstack/react-router";
import { CandidateDetailPage } from "@/features/candidate/pages/candidate-detail.page.tsx";

export const Route = createFileRoute("/candidate/$candidateId")({
    component: CandidateDetailPage,
});
