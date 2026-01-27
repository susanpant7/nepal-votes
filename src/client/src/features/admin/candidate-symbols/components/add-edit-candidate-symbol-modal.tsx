import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { ImageField } from "@/components/ui/image-field.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";

export interface Props {
  editFileId?: number;
  editFile?: string | File | null;
  showAddCandidateSymbolModal: boolean;
  setShowAddCandidateSymbolModal: (show: boolean) => void;
  onSaveSymbolButtonClick: (symbolFile: File | string | null) => void;
}
export const AddEditCandidateSymbolModal = (props: Props) => {
  const {
    editFileId,
    editFile,
    showAddCandidateSymbolModal,
    setShowAddCandidateSymbolModal,
    onSaveSymbolButtonClick,
  } = props;

  const [symbolContent, setSymbolContent] = useState<string | null | File>(
    editFile || null,
  );

  const onSymbolChange = (file: File | null) => {
    setSymbolContent(file);
  };

  const disableSave = symbolContent == null;

  return (
    <Dialog
      open={showAddCandidateSymbolModal}
      onOpenChange={setShowAddCandidateSymbolModal}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Symbol</DialogTitle>
          <DialogDescription>
            {" "}
            Symbol for independent candidates
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label htmlFor="constituencyName">New Symbol</Label>
            <ImageField
              label="Candidate Symbol"
              value={symbolContent}
              onChange={onSymbolChange}
              maxSizeMB={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setShowAddCandidateSymbolModal(false)}
          >
            Cancel
          </Button>

          <Button
            disabled={disableSave}
            onClick={() => onSaveSymbolButtonClick(symbolContent)}
          >
            {editFileId ? "Update" : "Add"} Symbol
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
