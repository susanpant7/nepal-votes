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
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { GeographicModalLayout } from "@/features/admin/electoral-geographies/components/GeographicModalLayout.tsx";
import React, { useState } from "react";
import type {
  AddVotingPlaceRequest,
  VotingPlaceInfo,
  UpdateVotingPlaceRequest,
} from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { useConfirm } from "@/components/confirm/confirm-dialogbox.provider.tsx";
import GeographicTableContainer from "@/features/admin/electoral-geographies/components/GeographicTableContainer.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { TABLE_THEME_CLASS } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.constants.ts";
import { EditDeleteAction } from "@/components/actions/edit-delete-action.tsx";

export interface VotingPlacesTableProps {
  parentId: number;
  parentName: string;
}
export const VotingPlacesTable = ({
  parentId,
  parentName,
}: VotingPlacesTableProps) => {
  const { data, isLoading, isError, refetch } =
    useAdminElectoralGeographyQuery.getVotingPlacesByWardId(parentId);
  const { addVotingPlace, updateVotingPlace } =
    useAdminElectoralGeographyMutation();
  const { deleteVotingPlace } = useAdminElectoralGeographyMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addEditVotingPlace, setAddEditVotingPlace] = useState<
    Partial<VotingPlaceInfo>
  >({});
  const confirm = useConfirm();

  const handleAddClick = () => {
    setAddEditVotingPlace({});
    setIsModalOpen(true);
  };

  const handleEditClick = (votingPlace: VotingPlaceInfo) => {
    setAddEditVotingPlace(votingPlace);
    setIsModalOpen(true);
  };

  const onVotingPlaceAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAddEditVotingPlace((prev) => ({
      ...prev,
      votingPlaceAddress: e.target.value,
    }));
  };
  const isInvalid = !addEditVotingPlace?.votingPlaceAddress?.trim();

  const handleSave = async () => {
    try {
      addEditVotingPlace.wardId = parentId;
      if (addEditVotingPlace.votingPlaceId) {
        await updateVotingPlace.mutateAsync(
          addEditVotingPlace as UpdateVotingPlaceRequest,
        );
      } else {
        await addVotingPlace.mutateAsync(
          addEditVotingPlace as AddVotingPlaceRequest,
        );
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleDeleteClick = async (id: number) => {
    const isConfirmed = await confirm({
      title: "Delete Voting Place?",
      description: "Are you sure you want to delete this voting place?",
    });

    if (isConfirmed) {
      await deleteVotingPlace.mutateAsync({
        votingPlaceId: id,
        wardId: parentId,
      });
    }
  };

  return (
    <QueryWrapper
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Failed to load voting places table."
    >
      <GeographicTableContainer
        themeClassName={TABLE_THEME_CLASS.VOTING_PLACE}
        module="VotingPlace"
        onAdd={handleAddClick}
        hierarchy={`Viewing voting places in ${parentName}`}
      >
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Address</TableHead>
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
                  No voting places found.
                </TableCell>
              </TableRow>
            )}

            {data?.map((votingPlace, index) => {
              return (
                <>
                  <TableRow
                    key={index}
                    className="cursor-pointer hover:bg-muted/30"
                  >
                    <TableCell className="font-medium">
                      {votingPlace.votingPlaceAddress}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditDeleteAction
                          onEditClick={() => handleEditClick(votingPlace)}
                          onDeleteClick={() =>
                            handleDeleteClick(votingPlace.votingPlaceId)
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </GeographicTableContainer>

      {/*add edit modal*/}
      <GeographicModalLayout
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="VotingPlace"
        onSave={handleSave}
        isEdit={!!addEditVotingPlace.votingPlaceId}
        saveDisabled={isInvalid}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              className="text-sm font-medium"
              htmlFor={"votingPlaceAddress"}
            >
              Voting Place Address
            </Label>
            <Input
              type="text"
              name="votingPlaceAddress"
              placeholder="Enter votingPlace name"
              value={addEditVotingPlace?.votingPlaceAddress || ""}
              onChange={onVotingPlaceAddressChange}
              required
              className="focus-visible:ring-slate-400"
            />
          </div>
        </div>
      </GeographicModalLayout>
    </QueryWrapper>
  );
};
