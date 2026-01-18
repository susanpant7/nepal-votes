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
import { ArrowUpCircle } from "lucide-react";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { GeographicModalLayout } from "@/features/admin/electoral-geographies/components/GeographicModalLayout.tsx";
import React, { useState } from "react";
import {
  type AddMunicipalityRequest,
  type MunicipalityInfo,
  type MunicipalityType,
  MunicipalityTypeLabels,
  type UpdateMunicipalityRequest,
} from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { useConfirm } from "@/components/confirm/confirm-dialogbox.provider.tsx";
import GeographicTableContainer from "@/features/admin/electoral-geographies/components/GeographicTableContainer.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { TABLE_THEME_CLASS } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.constants.ts";
import { ExpandCollapseIcon } from "@/components/expand-collapse-icon/expand-collapse-icon.tsx";
import { EditDeleteAction } from "@/components/actions/edit-delete-action.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { WardsTable } from "@/features/admin/electoral-geographies/components/WardsTable.tsx";

export interface MunicipalitiesTableProps {
  parentId: number;
  parentName: string;
}
export const MunicipalitiesTable = ({
  parentId,
  parentName,
}: MunicipalitiesTableProps) => {
  const { data, isLoading, isError, refetch } =
    useAdminElectoralGeographyQuery.getMunicipalitiesByDistrictId(parentId);
  const { addMunicipality, updateMunicipality } =
    useAdminElectoralGeographyMutation();
  const { deleteMunicipality } = useAdminElectoralGeographyMutation();
  const [expandedRowId, setExpandedRowId] = useState<string | number | null>(
    null,
  );
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
      // Convert string back to number for your MunicipalityType
      municipalityType: Number(value) as MunicipalityType,
    }));
  };

  const isInvalid =
    !addEditMunicipality?.municipalityName?.trim() ||
    !addEditMunicipality?.municipalityType;

  const handleSave = async () => {
    try {
      addEditMunicipality.districtId = parentId;
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

  const toggleRow = (id: number) => {
    setExpandedRowId((prevId) => (prevId === id ? null : id));
  };

  const handleDeleteClick = async (id: number) => {
    const isConfirmed = await confirm({
      title: "Delete Municipality?",
      description: "Are you sure you want to delete this municipality?",
    });

    if (isConfirmed) {
      await deleteMunicipality.mutateAsync({
        municipalityId: id,
        districtId: parentId,
      });
    }
  };

  return (
    <QueryWrapper
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Failed to load districts table."
    >
      <GeographicTableContainer
        themeClassName={TABLE_THEME_CLASS.MUNICIPALITY}
        module="Municipality"
        onAdd={handleAddClick}
        hierarchy={parentName}
      >
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Municipality Name</TableHead>
              <TableHead>Municipality Type</TableHead>
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
                  No municipalities found.
                </TableCell>
              </TableRow>
            )}

            {data?.map((municipality, index) => {
              const isExpanded = expandedRowId === municipality.municipalityId;
              const expandedIndex = data.findIndex(
                (p) => p.municipalityId === expandedRowId,
              );
              if (expandedRowId !== null && index > expandedIndex) {
                // Only show the "View All" helper on the very next index to avoid repeating it
                if (index === expandedIndex + 1) {
                  return (
                    <TableRow key="view-all-helper" className="bg-muted/5">
                      <TableCell colSpan={4} className="p-0">
                        <Button
                          variant="ghost"
                          className="w-full h-12 rounded-none border-b border-dashed gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                          onClick={() => setExpandedRowId(null)}
                        >
                          <ArrowUpCircle className="h-4 w-4" />
                          <span className="font-medium">
                            You are viewing{" "}
                            {data[expandedIndex].municipalityName} wards. Click
                            to view all municipalities.
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
                // Hide the rest of the rows to keep the focus on the expanded sub-table
                return null;
              }
              return (
                <>
                  <TableRow
                    key={index}
                    className="cursor-pointer hover:bg-muted/30"
                  >
                    <TableCell>
                      <ExpandCollapseIcon
                        onClick={() => toggleRow(municipality.municipalityId)}
                        isExpanded={isExpanded}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {municipality.municipalityName}
                    </TableCell>
                    <TableCell className="font-medium">
                      {MunicipalityTypeLabels[municipality.municipalityType]}
                    </TableCell>
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
                  </TableRow>

                  {expandedRowId === municipality.municipalityId && (
                    <TableRow className="bg-muted/20 hover:bg-muted/20">
                      <TableCell colSpan={4} className="p-0">
                        <WardsTable
                          parentId={municipality.municipalityId}
                          parentName={
                            parentName + " > " + municipality.municipalityName
                          }
                        />
                      </TableCell>
                    </TableRow>
                  )}
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
