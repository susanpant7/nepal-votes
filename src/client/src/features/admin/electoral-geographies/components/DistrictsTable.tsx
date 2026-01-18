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
import type {
  AddDistrictRequest,
  DistrictInfo,
  UpdateDistrictRequest,
} from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { useConfirm } from "@/components/confirm/confirm-dialogbox.provider.tsx";
import { MunicipalitiesTable } from "@/features/admin/electoral-geographies/components/MunicipalitiesTable.tsx";
import GeographicTableContainer from "@/features/admin/electoral-geographies/components/GeographicTableContainer.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { TABLE_THEME_CLASS } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.constants.ts";
import { ExpandCollapseIcon } from "@/components/expand-collapse-icon/expand-collapse-icon.tsx";
import { EditDeleteAction } from "@/components/actions/edit-delete-action.tsx";

export interface DistrictsTableProps {
  parentId: number;
  parentName: string;
}
export const DistrictsTable = ({
  parentId,
  parentName,
}: DistrictsTableProps) => {
  const { data, isLoading, isError, refetch } =
    useAdminElectoralGeographyQuery.getDistrictsByProvinceId(parentId);
  const { addDistrict, updateDistrict } = useAdminElectoralGeographyMutation();
  const { deleteDistrict } = useAdminElectoralGeographyMutation();
  const [expandedRowId, setExpandedRowId] = useState<string | number | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addEditDistrict, setAddEditDistrict] = useState<Partial<DistrictInfo>>(
    {},
  );
  const confirm = useConfirm();

  const handleAddClick = () => {
    setAddEditDistrict({});
    setIsModalOpen(true);
  };

  const handleEditClick = (district: DistrictInfo) => {
    setAddEditDistrict(district);
    setIsModalOpen(true);
  };

  const onDistrictNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddEditDistrict((prev) => ({ ...prev, districtName: e.target.value }));
  };
  const isInvalid = !addEditDistrict?.districtName?.trim();

  const handleSave = async () => {
    try {
      addEditDistrict.provinceId = parentId;
      if (addEditDistrict.districtId) {
        await updateDistrict.mutateAsync(
          addEditDistrict as UpdateDistrictRequest,
        );
      } else {
        await addDistrict.mutateAsync(addEditDistrict as AddDistrictRequest);
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
      title: "Delete District?",
      description: "Are you sure you want to delete this district?",
    });

    if (isConfirmed) {
      if (expandedRowId == id) {
        setExpandedRowId(null);
      }
      await deleteDistrict.mutateAsync({
        districtId: id,
        provinceId: parentId,
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
        themeClassName={TABLE_THEME_CLASS.DISTRICT}
        module="District"
        onAdd={handleAddClick}
        hierarchy={`Viewing districts in ${parentName}`}
      >
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Province Name</TableHead>
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
                  No districts found.
                </TableCell>
              </TableRow>
            )}

            {data?.map((district, index) => {
              const isExpanded = expandedRowId === district.districtId;
              const expandedIndex = data.findIndex(
                (p) => p.districtId === expandedRowId,
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
                            You are viewing {data[expandedIndex].districtName}{" "}
                            municipalities. Click to view all districts.
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
                        onClick={() => toggleRow(district.districtId)}
                        isExpanded={isExpanded}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {district.districtName}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <EditDeleteAction
                          onEditClick={() => handleEditClick(district)}
                          onDeleteClick={() =>
                            handleDeleteClick(district.districtId)
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>

                  {expandedRowId === district.districtId && (
                    <TableRow className="bg-muted/20 hover:bg-muted/20">
                      <TableCell colSpan={4} className="p-0">
                        <MunicipalitiesTable
                          parentId={district.districtId}
                          parentName={
                            parentName +
                            " > " +
                            district.districtName +
                            " district"
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
        title="District"
        onSave={handleSave}
        isEdit={!!addEditDistrict.districtId}
        saveDisabled={isInvalid}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor={"provinceName"}>
              District Name
            </Label>
            <Input
              type="text"
              name="districtName"
              placeholder="Enter district name"
              value={addEditDistrict?.districtName || ""}
              onChange={onDistrictNameChange}
              required
              className="focus-visible:ring-slate-400"
            />
          </div>
        </div>
      </GeographicModalLayout>
    </QueryWrapper>
  );
};
