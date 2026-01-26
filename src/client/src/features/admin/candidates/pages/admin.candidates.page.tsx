import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";
import { CandidatesTable } from "@/features/admin/candidates/components/candidates-table.tsx";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/lib/app.routes.urls.ts";

export const AdminCandidatesPage = () => {
  const navigate = useNavigate();
  const onAddCandidateButtonClick = async () => {
    await navigate({
      to: ROUTES.ADMIN_CANDIDATES_ADD,
    });
  };
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Candidates</h1>

        <Button onClick={onAddCandidateButtonClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add Candidate
        </Button>
      </div>
      {/* Table */}
      <CandidatesTable />
    </div>
  );
};
