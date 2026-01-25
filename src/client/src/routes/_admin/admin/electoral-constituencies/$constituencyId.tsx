import { createFileRoute } from "@tanstack/react-router";
import { AdminElectoralConstituenciesPageEdit } from "@/features/admin/electoral-constituencies/pages/admin.electoral-constituencies.page.edit.tsx";

export const Route = createFileRoute(
  "/_admin/admin/electoral-constituencies/$constituencyId",
)({
  component: EditConstituency,
});

function EditConstituency() {
  const { constituencyId } = Route.useParams();

  return (
    <AdminElectoralConstituenciesPageEdit
      constituencyId={Number(constituencyId)}
    />
  );
}
