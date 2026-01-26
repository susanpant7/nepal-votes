import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper";
import { useState } from "react";
import { useAdminConstituencyQuery } from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.query.ts";
import { FilterBar } from "@/features/admin/electoral-constituencies/components/filter-bar.tsx";
import { ConstituenciesTable } from "@/features/admin/electoral-constituencies/components/constituency-table.tsx";

export const ViewConstituenciesByDistrict = () => {
  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [districtId, setDistrictId] = useState<number | null>(null);

  const {
    data: constituencies = [],
    isLoading,
    isError,
    refetch,
  } = useAdminConstituencyQuery.getConstituenciesListItemsBydDistrictId(
    districtId,
  );

  const onDistrictChange = (districtId: number) => {
    setDistrictId(districtId);
  };

  const onProvinceChange = (provinceId: number) => {
    setProvinceId(provinceId);
    setDistrictId(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
        Select province and district to view constituencies of that district
      </h2>
      {/* Province & District Filters */}
      <FilterBar
        onProvinceChange={onProvinceChange}
        onDistrictChange={onDistrictChange}
      />

      {provinceId == null || districtId == null ? (
        <div className="text-sm text-muted-foreground">
          Select province and district to view constituencies
        </div>
      ) : (
        <QueryWrapper isLoading={isLoading} isError={isError} refetch={refetch}>
          <ConstituenciesTable constituencies={constituencies} />
        </QueryWrapper>
      )}
    </div>
  );
};
