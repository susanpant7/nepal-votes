import { ConstituencyDropdownSelect } from "@/features/admin/electoral-constituencies/components/constituency-dropdown-select.tsx";
import type {
  AddConstituencyRequest,
  ConstituencyDropdown,
  MunicipalityWithWardsDetails,
  ReassignWardRequest,
  WardWithConstituencyDetails,
} from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import { useAdminConstituencyMutation } from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.query.ts";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

export interface Props {
  municipality: MunicipalityWithWardsDetails;
  ward: WardWithConstituencyDetails;
}
export const WardConstituencyItem = (props: Props) => {
  const [ward, setWard] = useState<WardWithConstituencyDetails>(props.ward);
  const [isReassigning, setIsReassigning] = useState(false);

  const [showConstituencyAddModal, setShowConstituencyAddModal] =
    useState(false);
  const [newConstituencyName, setNewConstituencyName] = useState("");

  const { addConstituency, reassignWard } = useAdminConstituencyMutation();
  const onConstituencyAssign = async (constituency: ConstituencyDropdown) => {
    const request: ReassignWardRequest = {
      wardId: ward.wardId,
      constituencyId: constituency.constituencyId,
      municipalityId: 0,
    };

    const reassignResponse = await reassignWard.mutateAsync(request);

    if (reassignResponse) {
      setWard((prev) => ({
        ...prev,
        constituencyId: constituency.constituencyId,
        constituencyName: constituency.constituencyName,
      }));

      setIsReassigning(false);
    }
  };

  const onAddConstituencyClick = (constituencyName: string) => {
    setShowConstituencyAddModal(true);
    setNewConstituencyName(constituencyName);
  };

  const onAddNewConstituencySave = async () => {
    setShowConstituencyAddModal(false);
    setNewConstituencyName("");
    const addRequest = {
      constituencyName: newConstituencyName,
    } as AddConstituencyRequest;
    await addConstituency.mutateAsync(addRequest);
  };

  const hasConstituency = !!ward.constituencyId;
  const dropdownDisabled = hasConstituency && !isReassigning;

  return (
    <div className="flex items-center justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-700">
      <span className="text-gray-700 dark:text-gray-200">
        Ward {ward.wardNumber} – {ward.wardName}
        {ward.constituencyName && (
          <span className="ml-2 text-xs font-medium text-blue-600 dark:text-blue-400">
            (Assigned to {ward.constituencyName})
          </span>
        )}
      </span>

      <div className="flex items-center gap-2">
        {hasConstituency && !isReassigning && (
          <button
            className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
            onClick={() => setIsReassigning(true)}
          >
            Reassign
          </button>
        )}

        <div className="w-64">
          <ConstituencyDropdownSelect
            disabled={dropdownDisabled}
            onChange={onConstituencyAssign}
            onAddConstituency={onAddConstituencyClick}
          />
        </div>
      </div>
      {showConstituencyAddModal && (
        <Dialog
          open={showConstituencyAddModal}
          onOpenChange={setShowConstituencyAddModal}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Constituency</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-1">
                <Label htmlFor="constituencyName">Constituency Name</Label>
                <Input
                  id="constituencyName"
                  placeholder="e.g. Kathmandu-12"
                  value={newConstituencyName}
                  onChange={(e) => setNewConstituencyName(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setShowConstituencyAddModal(false)}
              >
                Cancel
              </Button>

              <Button
                disabled={!newConstituencyName.trim()}
                onClick={onAddNewConstituencySave}
              >
                Add Constituency
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
