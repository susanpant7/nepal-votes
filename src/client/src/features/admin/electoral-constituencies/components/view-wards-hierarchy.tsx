import { useAdminConstituencyQuery } from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.query.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import type { ProvinceWithDistrictsDetails } from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import { useEffect, useState } from "react";
import { WardConstituencyItem } from "@/features/admin/electoral-constituencies/components/ward-constituency-item.tsx";

export const ViewWardsHierarchy = () => {
  const {
    data: queryData,
    isLoading,
    isError,
    refetch,
  } = useAdminConstituencyQuery.getUnassignedWards();

  const [data, setData] = useState<ProvinceWithDistrictsDetails[]>([]);

  useEffect(() => {
    if (queryData) {
      setData(queryData);
    }
  }, [queryData]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Province - District - Municipality - Wards
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
                              <WardConstituencyItem
                                municipality={municipality}
                                ward={ward}
                              />
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
