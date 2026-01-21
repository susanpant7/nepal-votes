import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft, Check, Pencil, Plus, X } from "lucide-react";
import type { ConstituencyInfo } from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import { useConstituencyStore } from "@/stores/useConstituencyStore.ts";
import { type ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { useGlobalStore } from "@/stores/useGlobalStore.ts";

export interface AddEditConstituencyProps {
  selectedConstituency: ConstituencyInfo | null;
  onAddButtonClick?: () => void;
  onEditButtonClick?: () => void;
  onEditCancel?: () => void;
}
export const AddEditConstituency = (props: AddEditConstituencyProps) => {
  const selectedWardIds = useConstituencyStore((s) => s.selectedWardIds);
  const setSelectedWardIds = useConstituencyStore((s) => s.setSelectedWardIds);
  const clearWards = useConstituencyStore((s) => s.clearWards);
  const setWorkInProgress = useGlobalStore((s) => s.setWorkInProgress);

  const [addEditInProgress, setAddEditInProgress] = useState<
    "ADD" | "EDIT" | ""
  >("");

  const [constituencyName, setConstituencyName] = useState("");

  useEffect(() => {
    if (props.selectedConstituency) {
      setAddEditInProgress("EDIT");
      setConstituencyName(props.selectedConstituency.constituencyName);
      setSelectedWardIds(props.selectedConstituency.wardIds);
    } else {
      setConstituencyName("");
    }
  }, [props.selectedConstituency]);

  const onAddButtonClick = () => {
    setWorkInProgress(true);
    setAddEditInProgress("ADD");
    setConstituencyName("");
  };
  const onEditButtonClick = () => {
    setAddEditInProgress("EDIT");
    setWorkInProgress(true);
    setConstituencyName(props.selectedConstituency?.constituencyName || "");
  };

  // const onSaveButtonClick = () => {};
  const onCancelButtonClick = () => {
    setWorkInProgress(false);
    clearWards();
    setAddEditInProgress("");
    setConstituencyName("");
    props.onEditCancel?.();
  };

  const onConstituencyNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConstituencyName(e.target.value);
  };

  const isNameValid = constituencyName.trim().length > 0;
  const hasSelectedWards = selectedWardIds.length > 0;
  const disableSave = !isNameValid || !hasSelectedWards;

  return (
    <div className="p-4 space-y-4">
      {/* Add / Edit buttons */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onAddButtonClick}
          disabled={addEditInProgress == "ADD"}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Constituency
        </Button>

        <Button
          variant="outline"
          onClick={onEditButtonClick}
          disabled={!props.selectedConstituency || addEditInProgress === "EDIT"}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit Constituency
        </Button>
      </div>

      {addEditInProgress && (
        <div className="space-y-3">
          <Input
            placeholder="Constituency name"
            value={constituencyName}
            onChange={onConstituencyNameChange}
          />

          <div className="px-4 py-2 scroll-theme-color">
            {selectedWardIds.length == 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowLeft className="h-4 w-4" />
                <span>
                  Select the wards from the Geographic Locations section
                </span>
              </div>
            )}
            {(selectedWardIds.length > 0 || props.selectedConstituency) && (
              <div className="max-h-75 flex flex-col">
                <h3 className="flex-none font-semibold text-foreground">
                  Selected Wards:
                </h3>
                <div className="lex-1 overflow-y-auto px-4 py-2 scroll-theme-colo">
                  <ul>
                    {selectedWardIds.map((id) => (
                      <li key={id} className="text-sm">
                        Ward ID: {id}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button
              onClick={() => alert("save clicked")}
              disabled={disableSave}
            >
              <Check className="h-4 w-4 mr-2" />
              {props.selectedConstituency?.constituencyId ? "Update" : "Save"}
            </Button>

            <Button variant="ghost" onClick={onCancelButtonClick}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
