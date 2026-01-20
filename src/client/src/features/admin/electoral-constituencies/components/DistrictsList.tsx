import type { ProvinceInfo } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { useAdminElectoralGeographyQuery } from "@/features/admin/electoral-geographies/api/admin.electoral-geographies.query.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { DistrictItem } from "@/features/admin/electoral-constituencies/components/DistrictItem.tsx";

export interface DistrictsListProps {
  province: ProvinceInfo;
}
export const DistrictsList = (props: DistrictsListProps) => {
  const { data, isLoading, isError, refetch } =
    useAdminElectoralGeographyQuery.getDistrictsByProvinceId(
      props.province.provinceId,
    );
  return (
    <QueryWrapper
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Failed to load districts data."
    >
      {(!data || data?.length == 0) && (
        <p className="text-muted-foreground">There is no data</p>
      )}
      {data?.map((district, index) => {
        return <DistrictItem key={index} district={district} />;
      })}
    </QueryWrapper>
  );
};
