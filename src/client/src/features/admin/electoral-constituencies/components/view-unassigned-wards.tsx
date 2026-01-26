import {
  useAdminConstituencyMutation,
  useAdminConstituencyQuery,
} from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.query.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import type {
  ConstituencyDropdown,
  ProvinceWithUnassignedWards,
  ReassignWardRequest,
  UnassignedWard,
} from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import { useConfirm } from "@/components/confirm/confirm-dialogbox.provider.tsx";
import { useEffect, useState } from "react";
import { ConstituencyDropdownSelect } from "@/features/admin/electoral-constituencies/components/constituency-dropdown-select.tsx";

export const ViewUnassignedWards = () => {
  const {
    data: queryData,
    isLoading,
    isError,
    refetch,
  } = useAdminConstituencyQuery.getUnassignedWards();
  const { reassignWard } = useAdminConstituencyMutation();
  const confirm = useConfirm();

  const [data, setData] = useState<ProvinceWithUnassignedWards[]>([]);

  useEffect(() => {
    if (queryData) {
      setData(queryData);
    }
  }, [queryData]);

  const onConstituencyAssign = async (
    municipalityName: string,
    ward: UnassignedWard,
    constituency: ConstituencyDropdown,
  ) => {
    const isConfirmed = await confirm({
      title: `Assign Ward Number ${ward.wardNumber} to Constituency ${constituency.constituencyName}?`,
      description: (
        <>
          This will assign Ward Number {ward.wardNumber} of Municipality $
          {municipalityName} to Constituency {constituency.constituencyName}.
        </>
      ),
    });

    if (!isConfirmed) return;

    const request: ReassignWardRequest = {
      wardId: ward.wardId,
      constituencyId: constituency.constituencyId,
      municipalityId: 0,
    };

    const reassignResponse = await reassignWard.mutateAsync(request);

    if (reassignResponse) {
      // Remove the assigned ward from local state
      setData((prev) =>
        prev
          .map((province) => ({
            ...province,
            districts: province.districts
              .map((district) => ({
                ...district,
                municipalities: district.municipalities.map((muni) => ({
                  ...muni,
                  wards: muni.wards.filter((w) => w.wardId !== ward.wardId),
                })),
              }))
              .filter((district) =>
                district.municipalities.some((muni) => muni.wards.length > 0),
              ),
          }))
          .filter((province) =>
            province.districts.some((district) =>
              district.municipalities.some((muni) => muni.wards.length > 0),
            ),
          ),
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        These are the wards that are not assigned to any constituencies:
      </h2>

      {/* Subheader */}
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Select a constituency from the dropdown to assign the ward.
      </p>

      <QueryWrapper isLoading={isLoading} isError={isError} refetch={refetch}>
        <div className="mt-4 space-y-6 h-112.5 overflow-y-scroll scroll-theme-color">
          {data?.map((province) => (
            <div key={province.provinceId} className="space-y-4">
              {/* Province */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {province.provinceName}
              </h3>

              <div className="space-y-4 pl-4 border-l border-gray-300 dark:border-gray-600">
                {province.districts.map((district) => (
                  <div key={district.districtId} className="space-y-3">
                    {/* District */}
                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                      {district.districtName}
                    </h4>

                    <div className="space-y-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                      {district.municipalities.map((municipality) => (
                        <div
                          key={municipality.municipalityId}
                          className="space-y-2"
                        >
                          {/* Municipality */}
                          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {municipality.municipalityName}
                          </h5>

                          {/* Wards */}
                          <div className="space-y-2 pl-4">
                            {municipality.wards.map((ward) => (
                              <div
                                key={ward.wardId}
                                className="flex items-center justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-700"
                              >
                                <span className="text-gray-700 dark:text-gray-200">
                                  Ward {ward.wardNumber} - {ward.wardName}
                                </span>
                                <div className="w-64">
                                  <ConstituencyDropdownSelect
                                    onChange={(constituency) =>
                                      onConstituencyAssign(
                                        municipality.municipalityName,
                                        ward,
                                        constituency,
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </QueryWrapper>
    </div>
  );
};
