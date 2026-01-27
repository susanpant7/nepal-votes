import type { CandidateDetail } from "@/features/admin/candidates/types/admin.candidates.types.ts";
import { Button } from "@/components/ui/button.tsx";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import { ChevronLeft } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { UserSearchDropdown } from "@/features/users/user-search/components/user-search-dropdown.tsx";
import { useNavigate } from "@tanstack/react-router";
import { ConstituencyDropdownSelect } from "@/features/admin/electoral-constituencies/components/constituency-dropdown-select.tsx";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card.tsx";
import type { CandidateSymbolInfo } from "@/features/admin/candidate-symbols/types/admin.candidate-symbols.types.ts";
import type { ConstituencyDropdown } from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { CandidateSymbolsList } from "@/features/admin/candidate-symbols/components/candidate-symbols-list.tsx";
import type { UserSearchResponse } from "@/features/users/user-search/types/user-search.types.ts";

export interface Props {
  isEdit: boolean;
  candidateDetail?: CandidateDetail;
}
export const AddEditCandidate = (props: Props) => {
  const { isEdit, candidateDetail } = props;

  const [selectedConstituency, setSelectedConstituency] =
    useState<ConstituencyDropdown | null>(null);
  const [selectedCandidate, setSelectedCandidate] =
    useState<UserSearchResponse | null>(null);
  const [selectedSymbol, setSelectedSymbol] =
    useState<CandidateSymbolInfo | null>(null);
  const [openSelectSymbolModal, setOpenSelectSymbolModal] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const onSaveButtonClick = () => {};

  const onConstituencySelect = (constituency: ConstituencyDropdown) => {
    setSelectedConstituency(constituency);
    alert(constituency.constituencyName);
  };

  const onCandidateSelect = (user: UserSearchResponse) => {
    setSelectedCandidate(user);
  };

  const onSelectSymbolButtonClick = () => {
    setOpenSelectSymbolModal(true);
  };

  const onSymbolSelect = (symbol: CandidateSymbolInfo) => {
    setSelectedSymbol(symbol);
    setOpenSelectSymbolModal(false);
  };

  const disableSaveButton =
    selectedConstituency == null ||
    selectedCandidate == null ||
    selectedSymbol == null;

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate({ to: ROUTES.ADMIN_CANDIDATES })}
        className="-ml-2 text-muted-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" /> Back to Candidates
      </Button>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          {isEdit ? "Edit Candidate" : "Create Candidate"}
        </h1>
        <p className="text-muted-foreground mt-1 max-w-xl">
          Fill in the details below to{" "}
          {isEdit ? "update the" : "register a new"} candidate.
        </p>
      </div>

      {/* Dropdowns */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4">
        {/* Constituency */}
        <div className="flex flex-col gap-1 w-full sm:w-64">
          <Label>Constituency</Label>
          <ConstituencyDropdownSelect onSelect={onConstituencySelect} />
        </div>

        {/* Candidate */}
        <div className="flex flex-col gap-1 w-full sm:w-64">
          <Label>Candidate</Label>
          <UserSearchDropdown
            onSelect={onCandidateSelect}
            currentUserName={candidateDetail?.candidateName ?? ""}
            searchLabel={"Search Candidate ... "}
          />
        </div>
      </div>

      {/* Select Symbol Section */}
      <div className="flex flex-col gap-3 items-start">
        <Button onClick={onSelectSymbolButtonClick} size="sm" variant="outline">
          {selectedSymbol ? "Change " : "Select "} Symbol
        </Button>

        {selectedSymbol && (
          <Card className="group hover:shadow-2xl transition-shadow w-40 sm:w-48 rounded-lg overflow-hidden">
            <CardContent className="p-2 flex justify-center items-center bg-gray-50">
              <img
                src={`data:${selectedSymbol.symbolContentType};base64,${selectedSymbol.symbolContent}`}
                alt={selectedSymbol.symbolFileName}
                className="w-36 h-36 sm:w-40 sm:h-40 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add / Update Candidate Button at Bottom */}
      <div className="flex justify-start mt-4">
        <Button
          onClick={onSaveButtonClick}
          size="lg"
          className="w-max"
          disabled={disableSaveButton}
        >
          {isEdit ? "Update Candidate" : "Add Candidate"}
        </Button>
      </div>

      {/*select symbol modal*/}
      {openSelectSymbolModal && (
        <Dialog
          open={openSelectSymbolModal}
          onOpenChange={setOpenSelectSymbolModal}
        >
          <DialogContent className="sm:max-w-[80vw] lg:max-w-[70vw] h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>
                Select an election symbol for the candidate
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto p-1">
              <CandidateSymbolsList
                allowView={true}
                onSelectSymbol={onSymbolSelect}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
