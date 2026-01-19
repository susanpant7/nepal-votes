import {
  useAdminElectoralGeographyMutation,
  useAdminElectoralGeographyQuery,
} from "@/features/admin/electoral-geographies/api/admin.electoral-geographies.query.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { GeographicModalLayout } from "@/features/admin/electoral-geographies/components/GeographicModalLayout.tsx";
import React, { useState } from "react";
import type {
  AddWardRequest,
  WardInfo,
  UpdateWardRequest,
  MunicipalityInfo,
} from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { useConfirm } from "@/components/confirm/confirm-dialogbox.provider.tsx";
import {
  GeographicTableContainer,
  type GoBackProps,
} from "@/features/admin/electoral-geographies/components/GeographicTableContainer.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { EditDeleteAction } from "@/components/actions/edit-delete-action.tsx";

export interface WardsTableProps {
  municipality: MunicipalityInfo;
  viewVotingPlaces: (ward: WardInfo) => void;
  goBackProps: GoBackProps;
}
export const WardsTable = ({
  municipality,
  viewVotingPlaces,
  goBackProps,
}: WardsTableProps) => {
  const { data, isLoading, isError, refetch } =
    useAdminElectoralGeographyQuery.getWardsByMunicipalityId(
      municipality.municipalityId,
    );
  const { addWard, updateWard } = useAdminElectoralGeographyMutation();
  const { deleteWard } = useAdminElectoralGeographyMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addEditWard, setAddEditWard] = useState<Partial<WardInfo>>({});
  const confirm = useConfirm();

  const handleAddClick = () => {
    setAddEditWard({});
    setIsModalOpen(true);
  };

  const handleEditClick = (ward: WardInfo) => {
    setAddEditWard(ward);
    setIsModalOpen(true);
  };

  const onWardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddEditWard((prev) => ({ ...prev, wardName: e.target.value }));
  };
  const onWardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddEditWard((prev) => ({
      ...prev,
      wardNumber: Number(e.target.value),
    }));
  };
  const isInvalid = !addEditWard?.wardName?.trim() || !addEditWard?.wardNumber;

  const handleSave = async () => {
    try {
      addEditWard.municipalityId = municipality.municipalityId;
      if (addEditWard.wardId) {
        await updateWard.mutateAsync(addEditWard as UpdateWardRequest);
      } else {
        await addWard.mutateAsync(addEditWard as AddWardRequest);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleDeleteClick = async (id: number) => {
    const isConfirmed = await confirm({
      title: "Delete Ward?",
      description: "Are you sure you want to delete this ward?",
    });

    if (isConfirmed) {
      await deleteWard.mutateAsync({
        wardId: id,
        municipalityId: municipality.municipalityId,
      });
    }
  };

  const onViewVotingPlaces = (ward: WardInfo) => {
    viewVotingPlaces(ward);
  };

  return (
    <QueryWrapper
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Failed to load wards table."
    >
      <GeographicTableContainer
        module="Wards"
        onAdd={handleAddClick}
        goBackProps={goBackProps}
      >
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Ward Name</TableHead>
              <TableHead>Ward Number</TableHead>
              <TableHead className="w-20"></TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(!data || data.length === 0) && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No wards found.
                </TableCell>
              </TableRow>
            )}

            {data?.map((ward, index) => {
              return (
                <TableRow
                  key={index}
                  className="cursor-pointer hover:bg-muted/30"
                >
                  <TableCell className="font-medium">{ward.wardName}</TableCell>
                  <TableCell className="font-medium">
                    {ward.wardNumber}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Button
                      variant="link"
                      className="h-auto p-0 text-blue-600 hover:text-blue-800"
                      onClick={() => onViewVotingPlaces(ward)}
                    >
                      View Voting Places
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <EditDeleteAction
                        onEditClick={() => handleEditClick(ward)}
                        onDeleteClick={() => handleDeleteClick(ward.wardId)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </GeographicTableContainer>

      {/*add edit modal*/}
      <GeographicModalLayout
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ward"
        onSave={handleSave}
        isEdit={!!addEditWard.wardId}
        saveDisabled={isInvalid}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor={"wardName"}>
              Ward Name
            </Label>
            <Input
              type="text"
              name="wardName"
              placeholder="Enter ward name"
              value={addEditWard?.wardName || ""}
              onChange={onWardNameChange}
              required
              className="focus-visible:ring-slate-400"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="wardNumber">
              Ward Number
            </Label>
            <Input
              id="wardNumber"
              type="number"
              name="wardNumber"
              placeholder="e.g. 1"
              value={addEditWard?.wardNumber || ""}
              onChange={onWardNumberChange}
              required
              min={1}
              className="w-full focus-visible:ring-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
      </GeographicModalLayout>
    </QueryWrapper>
  );
};
