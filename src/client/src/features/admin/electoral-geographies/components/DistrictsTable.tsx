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
  AddDistrictRequest,
  DistrictInfo,
  ProvinceInfo,
  UpdateDistrictRequest,
} from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { useConfirm } from "@/components/confirm/confirm-dialogbox.provider.tsx";
import {
  GeographicTableContainer,
  type GoBackProps,
} from "@/features/admin/electoral-geographies/components/GeographicTableContainer.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { EditDeleteAction } from "@/components/actions/edit-delete-action.tsx";
import { Button } from "@/components/ui/button.tsx";

export interface DistrictsTableProps {
  province: ProvinceInfo;
  viewMunicipalities: (district: DistrictInfo) => void;
  goBackProps: GoBackProps;
  allowAddEdit: boolean;
}
export const DistrictsTable = ({
  province,
  viewMunicipalities,
  goBackProps,
  allowAddEdit,
}: DistrictsTableProps) => {
  const { data, isLoading, isError, refetch } =
    useAdminElectoralGeographyQuery.getDistrictsByProvinceId(
      province.provinceId,
    );
  const { addDistrict, updateDistrict } = useAdminElectoralGeographyMutation();
  const { deleteDistrict } = useAdminElectoralGeographyMutation();
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
      addEditDistrict.provinceId = province.provinceId;
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

  const handleDeleteClick = async (id: number) => {
    const isConfirmed = await confirm({
      title: "Delete District?",
      description: "Are you sure you want to delete this district?",
    });

    if (isConfirmed) {
      await deleteDistrict.mutateAsync({
        districtId: id,
        provinceId: province.provinceId,
      });
    }
  };

  const onViewMunicipalities = (district: DistrictInfo) => {
    viewMunicipalities(district);
  };

  return (
    <QueryWrapper
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Failed to load districts table."
    >
      <GeographicTableContainer
        module="Districts"
        onAdd={handleAddClick}
        goBackProps={goBackProps}
        allowAddEdit={allowAddEdit}
      >
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>District Name</TableHead>
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
                  No districts found.
                </TableCell>
              </TableRow>
            )}

            {data?.map((district, index) => {
              return (
                <>
                  <TableRow
                    key={index}
                    className="cursor-pointer hover:bg-muted/30"
                  >
                    <TableCell className="font-medium">
                      {district.districtName}
                    </TableCell>
                    <TableCell className="font-medium">
                      <Button
                        variant="link"
                        className="h-auto p-0 text-blue-600 hover:text-blue-800"
                        onClick={() => onViewMunicipalities(district)}
                      >
                        View Municipalities
                      </Button>
                    </TableCell>
                    {allowAddEdit && (
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
                    )}
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
