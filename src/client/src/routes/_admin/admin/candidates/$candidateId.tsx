import { createFileRoute } from "@tanstack/react-router";
import { AdminCandidatePageEdit } from "@/features/admin/candidates/pages/admin.candidates.page.edit.tsx";

export const Route = createFileRoute("/_admin/admin/candidates/$candidateId")({
  component: EditCandidate,
});

function EditCandidate() {
  const { candidateId } = Route.useParams();

  return <AdminCandidatePageEdit candidateId={Number(candidateId)} />;
}
