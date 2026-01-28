import type { CandidateDetail } from "@/features/admin/candidates/types/admin.candidates.types.ts";
import { Button } from "@/components/ui/button.tsx";
import { ChevronLeft } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { UserSearchDropdown } from "@/features/users/user-search/components/user-search-dropdown.tsx";
import { useNavigate } from "@tanstack/react-router";
import { ConstituencyDropdownSelect } from "@/features/admin/electoral-constituencies/components/constituency-dropdown-select.tsx";
import { useState } from "react";
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
import type { PoliticalPartyInfo } from "@/features/admin/political-parties/types/admin.political-parties.types.ts";
import { SelectPoliticalParty } from "@/features/admin/political-parties/components/select-political-party.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { cn } from "@/lib/utils.ts";
import { Separator } from "@radix-ui/react-select";

export interface Props {
  isEdit: boolean;
  candidateDetail?: CandidateDetail;
}
export const AddEditCandidate = (props: Props) => {
  const { isEdit, candidateDetail } = props;
  const navigate = useNavigate();

  // --- State ---
  const [selectedConstituency, setSelectedConstituency] =
    useState<ConstituencyDropdown | null>(null);
  const [selectedCandidate, setSelectedCandidate] =
    useState<UserSearchResponse | null>(null);
  const [isIndependent, setIsIndependent] = useState<boolean>(false);
  const [selectedSymbol, setSelectedSymbol] =
    useState<CandidateSymbolInfo | null>(null);
  const [selectedParty, setSelectedParty] = useState<PoliticalPartyInfo | null>(
    null,
  );

  const [openSelectSymbolModal, setOpenSelectSymbolModal] =
    useState<boolean>(false);
  const [openSelectPartyModal, setOpenSelectPartyModal] =
    useState<boolean>(false);

  // --- Handlers ---
  const onConstituencySelect = (constituency: ConstituencyDropdown) =>
    setSelectedConstituency(constituency);
  const onCandidateSelect = (user: UserSearchResponse) =>
    setSelectedCandidate(user);

  const onSymbolSelect = (symbol: CandidateSymbolInfo) => {
    setSelectedSymbol(symbol);
    setOpenSelectSymbolModal(false);
  };

  const onPartySelect = (party: PoliticalPartyInfo) => {
    setSelectedParty(party);
    setOpenSelectPartyModal(false);
  };

  const onSaveButtonClick = () => {
    console.log("Saving...", {
      selectedConstituency,
      selectedCandidate,
      isIndependent,
      selectedSymbol,
      selectedParty,
    });
  };

  // --- Validation ---
  const disableSaveButton =
    !selectedConstituency ||
    !selectedCandidate ||
    (isIndependent ? !selectedSymbol : !selectedParty);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10 px-4 sm:px-0">
      {/* 1. Header & Navigation */}
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: "/admin/candidates" })} // Update to your ROUTES constant
          className="-ml-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Back to Candidates
        </Button>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
            {isEdit ? "Edit Candidate" : "Create Candidate"}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            {isEdit
              ? "Update the information for this candidate record."
              : "Fill in the details below to register a new candidate in the system."}
          </p>
        </div>
      </div>

      <Separator />

      {/* 2. Primary Configuration Row */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
        <div className="sm:col-span-4 flex flex-col gap-2">
          <Label className="text-sm font-semibold text-foreground/80">
            Constituency
          </Label>
          <ConstituencyDropdownSelect onSelect={onConstituencySelect} />
        </div>

        <div className="sm:col-span-5 flex flex-col gap-2">
          <Label className="text-sm font-semibold text-foreground/80">
            Candidate User
          </Label>
          <UserSearchDropdown
            onSelect={onCandidateSelect}
            currentUserName={candidateDetail?.candidateName ?? ""}
            searchLabel={"Search for a user..."}
          />
        </div>

        <div className="sm:col-span-3 flex flex-col gap-2">
          <Label
            htmlFor="status"
            className="text-sm font-semibold text-foreground/80"
          >
            Candidacy Type
          </Label>
          <div
            className={cn(
              "flex h-10 items-center justify-between gap-2 rounded-md border px-3 shadow-sm transition-all",
              isIndependent
                ? "bg-primary/5 border-primary/30"
                : "bg-background border-input",
            )}
          >
            <span className="text-sm font-medium">Independent</span>
            <Checkbox
              id="status"
              checked={isIndependent}
              onCheckedChange={(checked) => setIsIndependent(!!checked)}
            />
          </div>
        </div>
      </div>

      {/* 3. Visual Identity Section (Party or Symbol) */}
      <div className="bg-muted/30 p-6 rounded-xl border border-dashed border-muted-foreground/20">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex flex-col gap-3 min-w-50">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {isIndependent ? "Election Symbol" : "Party Affiliation"}
            </h3>
            <Button
              onClick={() =>
                isIndependent
                  ? setOpenSelectSymbolModal(true)
                  : setOpenSelectPartyModal(true)
              }
              variant="outline"
              className="w-full sm:w-max shadow-sm"
            >
              {isIndependent
                ? selectedSymbol
                  ? "Change Symbol"
                  : "Select Symbol"
                : selectedParty
                  ? "Change Party"
                  : "Select Party"}
            </Button>
          </div>

          {/* Inline Image Preview */}
          {((isIndependent && selectedSymbol) ||
            (!isIndependent && selectedParty)) && (
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="h-12 w-px bg-border hidden sm:block" />

              <div className="relative group">
                <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-lg border bg-white p-2 shadow-sm transition-all group-hover:shadow-md">
                  <img
                    src={
                      isIndependent
                        ? `data:${selectedSymbol?.symbolContentType};base64,${selectedSymbol?.symbolContent}`
                        : `data:${selectedParty?.partySymbolContentType};base64,${selectedParty?.partySymbolContent}`
                    }
                    alt="Preview"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Selected {isIndependent ? "Symbol" : "Party"}
                </span>
                <span className="text-lg font-bold text-foreground">
                  {isIndependent
                    ? selectedSymbol?.symbolFileName
                    : selectedParty?.politicalPartyName}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Action Footer */}
      <div className="flex items-center justify-between pt-6 border-t mt-8">
        <p className="text-xs text-muted-foreground italic">
          * Ensure all credentials and affiliations are verified before saving.
        </p>
        <Button
          onClick={onSaveButtonClick}
          size="lg"
          className="px-10 font-bold shadow-lg shadow-primary/20"
          disabled={disableSaveButton}
        >
          {isEdit ? "Update Candidate" : "Add Candidate"}
        </Button>
      </div>

      {/* 5. Extracted Modals */}
      {renderSymbolModal(
        openSelectSymbolModal,
        setOpenSelectSymbolModal,
        onSymbolSelect,
      )}
      {renderPartyModal(
        openSelectPartyModal,
        setOpenSelectPartyModal,
        onPartySelect,
      )}
    </div>
  );
};

// --- Helper Functions to Render Modals ---

function renderSymbolModal(
  isOpen: boolean,
  setOpen: (open: boolean) => void,
  onSelect: (s: CandidateSymbolInfo) => void,
) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[80vw] lg:max-w-[70vw] h-[80vh] flex flex-col border-none shadow-2xl ring-1 ring-black/5">
        <DialogHeader className="px-1">
          <DialogTitle className="text-xl">
            Select Candidate Election Symbol
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto mt-4 pr-2">
          <CandidateSymbolsList allowView={true} onSelectSymbol={onSelect} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function renderPartyModal(
  isOpen: boolean,
  setOpen: (open: boolean) => void,
  onSelect: (p: PoliticalPartyInfo) => void,
) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[80vw] lg:max-w-[70vw] h-[80vh] flex flex-col border-none shadow-2xl ring-1 ring-black/5">
        <DialogHeader className="px-1">
          <DialogTitle className="text-xl">
            Select Affiliated Political Party
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto mt-4 pr-2">
          <SelectPoliticalParty onPartySelect={onSelect} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
