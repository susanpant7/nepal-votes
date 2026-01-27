import { CandidateSymbolsList } from "@/features/admin/candidate-symbols/components/candidate-symbols-list.tsx";

export const AdminCandidateSymbolsPage = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Candidate Symbols</h1>
      </div>
      <CandidateSymbolsList />
    </div>
  );
};
