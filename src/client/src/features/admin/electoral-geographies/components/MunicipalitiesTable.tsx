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
import {
  type AddMunicipalityRequest,
  type DistrictInfo,
  type MunicipalityInfo,
  type MunicipalityType,
  MunicipalityTypeLabels,
  type UpdateMunicipalityRequest,
} from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { useConfirm } from "@/components/confirm/confirm-dialogbox.provider.tsx";
import {
  GeographicTableContainer,
  type GoBackProps,
} from "@/features/admin/electoral-geographies/components/GeographicTableContainer.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { EditDeleteAction } from "@/components/actions/edit-delete-action.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

export interface MunicipalitiesTableProps {
  district: DistrictInfo;
  viewWards: (municipality: MunicipalityInfo) => void;
  goBackProps: GoBackProps;
  allowAddEdit: boolean;
}
export const MunicipalitiesTable = ({
  district,
  viewWards,
  goBackProps,
  allowAddEdit,
}: MunicipalitiesTableProps) => {
  const { data, isLoading, isError, refetch } =
    useAdminElectoralGeographyQuery.getMunicipalitiesByDistrictId(
      district.districtId,
    );
  const { addMunicipality, updateMunicipality } =
    useAdminElectoralGeographyMutation();
  const { deleteMunicipality } = useAdminElectoralGeographyMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addEditMunicipality, setAddEditMunicipality] = useState<
    Partial<MunicipalityInfo>
  >({});
  const confirm = useConfirm();

  const handleAddClick = () => {
    setAddEditMunicipality({});
    setIsModalOpen(true);
  };

  const handleEditClick = (municipality: MunicipalityInfo) => {
    setAddEditMunicipality(municipality);
    setIsModalOpen(true);
  };

  const onMunicipalityNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddEditMunicipality((prev) => ({
      ...prev,
      municipalityName: e.target.value,
    }));
  };
  const onMunicipalityTypeChange = (value: string) => {
    setAddEditMunicipality((prev) => ({
      ...prev,
      municipalityType: Number(value) as MunicipalityType,
    }));
  };

  const isInvalid =
    !addEditMunicipality?.municipalityName?.trim() ||
    !addEditMunicipality?.municipalityType;

  const handleSave = async () => {
    try {
      addEditMunicipality.districtId = district.districtId;
      if (addEditMunicipality.municipalityId) {
        await updateMunicipality.mutateAsync(
          addEditMunicipality as UpdateMunicipalityRequest,
        );
      } else {
        await addMunicipality.mutateAsync(
          addEditMunicipality as AddMunicipalityRequest,
        );
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleDeleteClick = async (id: number) => {
    const isConfirmed = await confirm({
      title: "Delete Municipality?",
      description: "Are you sure you want to delete this municipality?",
    });

    if (isConfirmed) {
      await deleteMunicipality.mutateAsync({
        municipalityId: id,
        districtId: district.districtId,
      });
    }
  };

  const onViewWards = (municipality: MunicipalityInfo) => {
    viewWards(municipality);
  };

  return (
    <QueryWrapper
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Failed to load districts table."
    >
      <GeographicTableContainer
        module="Municipalities"
        onAdd={handleAddClick}
        goBackProps={goBackProps}
        allowAddEdit={allowAddEdit}
      >
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Municipality Name</TableHead>
              <TableHead>Municipality Type</TableHead>
              <TableHead className="w-20"></TableHead>
              {allowAddEdit && (
                <TableHead className="text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {(!data || data.length === 0) && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No municipalities found.
                </TableCell>
              </TableRow>
            )}

            {data?.map((municipality, index) => {
              return (
                <TableRow
                  key={index}
                  className="cursor-pointer hover:bg-muted/30"
                >
                  <TableCell className="font-medium">
                    {municipality.municipalityName}
                  </TableCell>
                  <TableCell className="font-medium">
                    {MunicipalityTypeLabels[municipality.municipalityType]}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Button
                      variant="link"
                      className="h-auto p-0 text-blue-600 hover:text-blue-800"
                      onClick={() => onViewWards(municipality)}
                    >
                      View Wards
                    </Button>
                  </TableCell>
                  {allowAddEdit && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditDeleteAction
                          onEditClick={() => handleEditClick(municipality)}
                          onDeleteClick={() =>
                            handleDeleteClick(municipality.municipalityId)
                          }
                        />
                      </div>
                    </TableCell>
                  )}
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
        title="Municipality"
        onSave={handleSave}
        isEdit={!!addEditMunicipality.municipalityId}
        saveDisabled={isInvalid}
      >
        <div className="space-y-4">
          {/* Municipality Name */}
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="municipalityName">
              Municipality Name
            </Label>
            <Input
              id="municipalityName"
              type="text"
              name="municipalityName"
              placeholder="Enter municipality name"
              value={addEditMunicipality?.municipalityName || ""}
              onChange={onMunicipalityNameChange}
              required
              className="w-full focus-visible:ring-slate-400"
            />
          </div>

          {/* Municipality Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="municipalityType">
              Municipality Type
            </Label>
            <Select
              value={addEditMunicipality?.municipalityType?.toString()}
              onValueChange={onMunicipalityTypeChange}
            >
              {/* Explicitly adding w-full here ensures it matches the Input length */}
              <SelectTrigger
                id="municipalityType"
                className="w-full focus:ring-slate-400"
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(MunicipalityTypeLabels).map(([id, label]) => (
                  <SelectItem key={id} value={id}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </GeographicModalLayout>
    </QueryWrapper>
  );
};
