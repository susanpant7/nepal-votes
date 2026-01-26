import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";
import { AdminCandidatesTable } from "@/features/admin/candidates/components/admin-candidates-table.tsx";

export const AdminCandidatesPage = () => {
  const onAddCandidateButtonClick = () => {};
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
      <AdminCandidatesTable />
    </div>
  );
};
