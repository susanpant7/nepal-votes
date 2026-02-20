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
import React, { useState } from "react";
import { GeographicModalLayout } from "@/features/admin/electoral-geographies/components/GeographicModalLayout.tsx";
import type {
  AddProvinceRequest,
  ProvinceInfo,
  UpdateProvinceRequest,
} from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { GeographicTableContainer } from "@/features/admin/electoral-geographies/components/GeographicTableContainer.tsx";
import { useConfirm } from "@/components/confirm/confirm-dialogbox.provider.tsx";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { EditDeleteAction } from "@/components/actions/edit-delete-action.tsx";
import { Button } from "@/components/ui/button.tsx";

export interface ProvincesTableProps {
  onViewDistrictsClick: (province: ProvinceInfo) => void;
  allowAddEdit: boolean;
}
export const ProvincesTable = (props: ProvincesTableProps) => {
  const { data, isLoading, isError, refetch } =
    useAdminElectoralGeographyQuery.getProvinces();

  const { addProvince, updateProvince } = useAdminElectoralGeographyMutation();
  const { deleteProvince } = useAdminElectoralGeographyMutation();
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

  const onViewDistrictsClick = (province: ProvinceInfo) => {
    props.onViewDistrictsClick(province);
  };

  const handleDeleteClick = async (id: number) => {
    const isConfirmed = await confirm({
      title: "Delete Province?",
      description: "Are you sure you want to delete this province?",
    });

    if (isConfirmed) {
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
        module="Provinces"
        onAdd={handleAddClick}
        allowAddEdit={props.allowAddEdit}
      >
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Province Name</TableHead>
              <TableHead className="w-20"></TableHead>
              {props.allowAddEdit && (
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
                  No provinces found.
                </TableCell>
              </TableRow>
            )}

            {data?.map((province) => {
              return (
                <TableRow
                  key={province.provinceId}
                  className="cursor-pointer hover:bg-muted/30"
                >
                  <TableCell className="font-medium">
                    {province.provinceName}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Button
                      type="button"
                      variant="link"
                      className="h-auto p-0 text-blue-600 hover:text-blue-800"
                      onClick={() => onViewDistrictsClick(province)}
                    >
                      View Districts
                    </Button>
                  </TableCell>
                  {props.allowAddEdit && (
                    <TableCell className="text-right">
                      <EditDeleteAction
                        onEditClick={() => handleEditClick(province)}
                        onDeleteClick={() =>
                          handleDeleteClick(province.provinceId)
                        }
                      />
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
