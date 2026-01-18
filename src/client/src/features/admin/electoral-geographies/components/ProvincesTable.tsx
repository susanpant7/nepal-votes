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
import React, { useState } from "react";
import { DistrictsTable } from "@/features/admin/electoral-geographies/components/DistrictsTable.tsx";
import { GeographicModalLayout } from "@/features/admin/electoral-geographies/components/GeographicModalLayout.tsx";
import type {
  AddProvinceRequest,
  ProvinceInfo,
  UpdateProvinceRequest,
} from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import GeographicTableContainer from "@/features/admin/electoral-geographies/components/GeographicTableContainer.tsx";
import { useConfirm } from "@/components/confirm/confirm-dialogbox.provider.tsx";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { TABLE_THEME_CLASS } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.constants.ts";
import { ExpandCollapseIcon } from "@/components/expand-collapse-icon/expand-collapse-icon.tsx";
import { EditDeleteAction } from "@/components/actions/edit-delete-action.tsx";

export const ProvincesTable = () => {
  const { data, isLoading, isError, refetch } =
    useAdminElectoralGeographyQuery.getProvinces();
  const { addProvince, updateProvince } = useAdminElectoralGeographyMutation();
  const { deleteProvince } = useAdminElectoralGeographyMutation();
  const [expandedRowId, setExpandedRowId] = useState<string | number | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addEditProvince, setAddEditProvince] = useState<Partial<ProvinceInfo>>(
    {},
  );
  const confirm = useConfirm();

  const handleAddClick = () => {
    setAddEditProvince({});
    setIsModalOpen(true);
  };

  const handleEditClick = (province: ProvinceInfo) => {
    setAddEditProvince(province);
    setIsModalOpen(true);
  };

  const onProvinceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddEditProvince((prev) => ({ ...prev, provinceName: e.target.value }));
  };
  const isInvalid = !addEditProvince?.provinceName?.trim();

  const handleSave = async () => {
    try {
      if (addEditProvince.provinceId) {
        await updateProvince.mutateAsync(
          addEditProvince as UpdateProvinceRequest,
        );
      } else {
        await addProvince.mutateAsync(addEditProvince as AddProvinceRequest);
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
      title: "Delete Province?",
      description: "Are you sure you want to delete this province?",
    });

    if (isConfirmed) {
      if (expandedRowId == id) {
        setExpandedRowId(null);
      }
      await deleteProvince.mutateAsync({ provinceId: id });
    }
  };

  return (
    <QueryWrapper
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Failed to load political parties table."
    >
      <GeographicTableContainer
        themeClassName={TABLE_THEME_CLASS.PROVINCE}
        module="Proince"
        onAdd={handleAddClick}
        hierarchy={"Viewing all provinces"}
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
                  No provinces found.
                </TableCell>
                `
              </TableRow>
            )}

            {data?.map((province, index) => {
              const isExpanded = expandedRowId === province.provinceId;
              const expandedIndex = data.findIndex(
                (p) => p.provinceId === expandedRowId,
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
                            You are viewing {data[expandedIndex].provinceName}{" "}
                            districts. Click to view all provinces.
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
                        onClick={() => toggleRow(province.provinceId)}
                        isExpanded={isExpanded}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {province.provinceName}
                    </TableCell>
                    <TableCell className="text-right">
                      <EditDeleteAction
                        onEditClick={() => handleEditClick(province)}
                        onDeleteClick={() =>
                          handleDeleteClick(province.provinceId)
                        }
                      />
                    </TableCell>
                  </TableRow>

                  {expandedRowId === province.provinceId && (
                    <TableRow className="bg-muted/20 hover:bg-muted/20">
                      <TableCell colSpan={4} className="p-0">
                        <DistrictsTable
                          parentId={province.provinceId}
                          parentName={province.provinceName}
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
        title="Province"
        onSave={handleSave}
        isEdit={!!addEditProvince.provinceId}
        saveDisabled={isInvalid}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor={"provinceName"}>
              Province Name
            </Label>
            <Input
              type="text"
              name="provinceName"
              placeholder="Enter province name"
              value={addEditProvince?.provinceName || ""}
              onChange={onProvinceNameChange}
              required
              className="focus-visible:ring-slate-400"
            />
          </div>
        </div>
      </GeographicModalLayout>
    </QueryWrapper>
  );
};
