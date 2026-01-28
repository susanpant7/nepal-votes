import { CandidateSymbolsList } from "@/features/admin/candidate-symbols/components/candidate-symbols-list.tsx";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { AddEditCandidateSymbolModal } from "@/features/admin/candidate-symbols/components/add-edit-candidate-symbol-modal.tsx";
import { useAdminCandidateSymbolMutation } from "@/features/admin/candidate-symbols/api/admin.candidate-symbols.query.ts";

export const AdminCandidateSymbolsPage = () => {
  const { addCandidateSymbol } = useAdminCandidateSymbolMutation();

  const [showAddCandidateSymbolModal, setShowAddCandidateSymbolModal] =
    useState(false);
  const onAddCandidateSymbolButtonClick = () => {
    setShowAddCandidateSymbolModal(true);
  };

  const onSaveSymbolButtonClick = async (file: File | string | null) => {
    await addCandidateSymbol.mutateAsync({ candidateSymbolFile: file });
    setShowAddCandidateSymbolModal(false);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Election Symbols For Independent Candidates
        </h1>
        <Button onClick={onAddCandidateSymbolButtonClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add Candidate Symbol
        </Button>
      </div>
      <CandidateSymbolsList allowEdit={true} allowView={true} />

      {showAddCandidateSymbolModal && (
        <AddEditCandidateSymbolModal
          showAddCandidateSymbolModal={showAddCandidateSymbolModal}
          setShowAddCandidateSymbolModal={setShowAddCandidateSymbolModal}
          onSaveSymbolButtonClick={onSaveSymbolButtonClick}
        />
      )}
    </div>
  );
};
