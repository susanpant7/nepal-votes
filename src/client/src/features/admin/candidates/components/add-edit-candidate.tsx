import type {
  AddCandidateRequest,
  CandidateDetail,
  UpdateCandidateRequest,
} from "@/features/admin/candidates/types/admin.candidates.types.ts";
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
import { SelectPoliticalParty } from "@/features/admin/political-parties/components/select-political-party.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { cn } from "@/lib/utils.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { useAdminCandidateMutation } from "@/features/admin/candidates/api/admin.candidates.query.ts";
import { showNotification } from "@/components/toaster/toaster.utils.ts";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import { useCandidateStore } from "@/stores/useCandidateStore.ts";
import type { PoliticalPartySelectInfo } from "@/features/admin/political-parties/types/admin.political-parties.types.ts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Input } from "@/components/ui/input.tsx";
import { ImageField } from "@/components/ui/image-field.tsx";

export interface Props {
  isEdit: boolean;
  candidateDetail?: CandidateDetail;
}

export const AddEditCandidate = (props: Props) => {
  const setConstituencyId = useCandidateStore((s) => s.setConstituencyId);
  const { isEdit, candidateDetail } = props;
  const navigate = useNavigate();

  const { addCandidate, updateCandidate } = useAdminCandidateMutation();
  // --- State ---
  const [selectedConstituencyId, setSelectedConstituencyId] = useState<
    number | null
  >(candidateDetail?.constituencyId ?? null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(
    candidateDetail?.candidateId ?? null,
  );
  const [isIndependent, setIsIndependent] = useState<boolean>(
    candidateDetail?.isIndependent ?? false,
  );
  const [selectedCandidateSymbol, setSelectedCandidateSymbol] =
    useState<CandidateSymbolInfo | null>(
      candidateDetail
        ? {
          candidateSymbolId: candidateDetail.candidateSymbolId ?? 0,
          symbolContentType: candidateDetail.symbolContentType,
          symbolContent: candidateDetail.symbolContent,
          symbolFileName: candidateDetail.candidateSymbolFileName,
        }
        : null,
    );
  const [selectedParty, setSelectedParty] =
    useState<PoliticalPartySelectInfo | null>(
      candidateDetail
        ? {
          politicalPartyId: candidateDetail.politicalPartyId ?? 0,
          politicalPartyName: candidateDetail.politicalPartyName ?? "",
          symbolContentType: candidateDetail.symbolContentType,
          symbolContent: candidateDetail.symbolContent,
          symbolFileName: candidateDetail.candidateSymbolFileName,
        }
        : null,
    );

  const [candidateImageId, setCandidateImageId] = useState<number | null>(
    candidateDetail?.candidateImageId ?? null,
  );
  const [uploadedImage, setUploadedImage] = useState<File | string | null>(
    candidateDetail?.imageContent ?? null,
  );
  const [imageTab, setImageTab] = useState<string>(
    candidateDetail?.imageContent ? "upload" : "id",
  );

  const [openSelectSymbolModal, setOpenSelectSymbolModal] =
    useState<boolean>(false);
  const [openSelectPartyModal, setOpenSelectPartyModal] =
    useState<boolean>(false);

  // --- Handlers ---
  const onConstituencySelect = (constituency: ConstituencyDropdown) =>
    setSelectedConstituencyId(constituency.constituencyId);
  const onCandidateSelect = (user: UserSearchResponse | null) =>
    setSelectedCandidateId(user?.userId ?? null);

  const onCandidacyTypeToggle = () => {
    setIsIndependent(!isIndependent);
    setSelectedParty(null);
    setSelectedCandidateSymbol(null);
  };

  const onSymbolSelect = (symbol: CandidateSymbolInfo) => {
    setSelectedCandidateSymbol(symbol);
    setOpenSelectSymbolModal(false);
  };

  const onPartySelect = (party: PoliticalPartySelectInfo) => {
    setSelectedParty(party);
    setOpenSelectPartyModal(false);
  };

  const onSaveButtonClick = async () => {
    if (selectedCandidateId == null) {
      showNotification.error("Select a candidate");
      return;
    }
    if (selectedConstituencyId == null) {
      showNotification.error("Select a constituency");
      return;
    }
    const addRequest: AddCandidateRequest = {
      userId: selectedCandidateId!,
      constituencyId: selectedConstituencyId!,
      isIndependent: isIndependent,
      politicalPartyId: isIndependent
        ? null
        : (selectedParty?.politicalPartyId ?? null),
      candidateSymbolId: isIndependent
        ? (selectedCandidateSymbol?.candidateSymbolId ?? null)
        : null,
      candidateImageId: imageTab === "id" ? (candidateImageId ?? 0) : 0,
    };

    if (imageTab === "upload" && uploadedImage != null) {
      if (uploadedImage instanceof File) {
        const base64 = await fileToBase64(uploadedImage);
        addRequest.imageContent = base64;
        addRequest.imageContentType = uploadedImage.type;
        addRequest.imageFileName = uploadedImage.name;
        addRequest.imageFileSize = uploadedImage.size;
      } else {
        // string (from existing record)
        addRequest.imageContent = uploadedImage;
        addRequest.imageContentType = candidateDetail?.imageContentType;
      }
    }
    if (isEdit && candidateDetail?.candidateId != null) {
      const updateRequest: UpdateCandidateRequest = {
        ...addRequest,
        candidateId: candidateDetail.candidateId,
      };
      await updateCandidate.mutateAsync(updateRequest);
    } else {
      await addCandidate.mutateAsync(addRequest);
    }
    setConstituencyId(selectedConstituencyId);
    await navigate({
      to: ROUTES.ADMIN_CANDIDATES,
    });
  };

  // --- Validation ---
  const disableSaveButton =
    !selectedConstituencyId ||
    !selectedCandidateId ||
    (isIndependent ? !selectedCandidateSymbol : !selectedParty);

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
          <ConstituencyDropdownSelect
            onSelect={onConstituencySelect}
            defaultConstituencyId={candidateDetail?.constituencyId}
          />
        </div>

        <div className="sm:col-span-5 flex flex-col gap-2">
          <Label className="text-sm font-semibold text-foreground/80">
            Candidate User
          </Label>
          <UserSearchDropdown
            onSelect={onCandidateSelect}
            currentUserName={candidateDetail?.fullName ?? ""}
            searchLabel={"Search for a candidate..."}
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
              onCheckedChange={onCandidacyTypeToggle}
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
                ? selectedCandidateSymbol
                  ? "Change Symbol"
                  : "Select Symbol"
                : selectedParty
                  ? "Change Party"
                  : "Select Party"}
            </Button>
          </div>

          {/* Inline Image Preview */}
          {((isIndependent && selectedCandidateSymbol) ||
            (!isIndependent && selectedParty)) && (
              <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="h-12 w-px bg-border hidden sm:block" />

                <div className="relative group">
                  <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-lg border bg-white p-2 shadow-sm transition-all group-hover:shadow-md">
                    <img
                      src={
                        isIndependent
                          ? `data:${selectedCandidateSymbol?.symbolContentType};base64,${selectedCandidateSymbol?.symbolContent}`
                          : `data:${selectedParty?.symbolContentType};base64,${selectedParty?.symbolContent}`
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
                      ? selectedCandidateSymbol?.symbolFileName
                      : selectedParty?.politicalPartyName}
                  </span>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* 4. Candidate Photo Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Candidate Photo</h2>
        <Tabs value={imageTab} onValueChange={setImageTab} className="w-full">
          <TabsList className="grid grid-cols-2 max-w-[400px]">
            <TabsTrigger value="id">Enter Image ID</TabsTrigger>
            <TabsTrigger value="upload">Upload Photo</TabsTrigger>
          </TabsList>
          <TabsContent value="id" className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              <div className="sm:col-span-4 flex flex-col gap-2">
                <Label className="text-sm font-semibold text-foreground/80">
                  Candidate Image ID
                </Label>
                <Input
                  type="number"
                  placeholder="e.g. 7043"
                  value={candidateImageId ?? ""}
                  onChange={(e) =>
                    setCandidateImageId(
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                  className="w-full"
                />
                <p className="text-[10px] text-muted-foreground">
                  Numeric ID from election.gov.np repository.
                </p>
              </div>
              <div className="sm:col-span-8">
                {candidateImageId ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Preview from ID
                    </span>
                    <div className="h-40 w-40 rounded-lg border bg-slate-50 p-2 overflow-hidden">
                      <img
                        src={`https://result.election.gov.np/Images/Candidate/${candidateImageId}.jpg`}
                        alt={`Candidate ${candidateImageId}`}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/400x400?text=No+Image+Found";
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-40 w-40 flex items-center justify-center rounded-lg border border-dashed text-muted-foreground text-xs p-4 text-center">
                    Enter valid ID to preview external image.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="upload" className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              <div className="sm:col-span-6">
                <ImageField
                  label="Candidate Photo"
                  value={uploadedImage}
                  onChange={setUploadedImage}
                />
              </div>
              <div className="sm:col-span-6">
                <p className="text-sm text-muted-foreground mt-2">
                  Upload a clear passport-sized photo of the candidate. This image
                  will be stored locally in our database.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 5. Action Footer */}
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

// --- Helpers ---
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      // Remove the "data:image/jpeg;base64," prefix
      resolve(base64String.split(",")[1]);
    };
    reader.onerror = (error) => reject(error);
  });
}

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
  onSelect: (p: PoliticalPartySelectInfo) => void,
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
