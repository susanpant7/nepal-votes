import type { MunicipalityInfo } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { useAdminElectoralGeographyQuery } from "@/features/admin/electoral-geographies/api/admin.electoral-geographies.query.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { WardItem } from "@/features/admin/electoral-constituencies/components/ward-item.tsx";

export interface WardsListProps {
  municipality: MunicipalityInfo;
}
export const WardsList = (props: WardsListProps) => {
  const { data, isLoading, isError, refetch } =
    useAdminElectoralGeographyQuery.getWardsByMunicipalityId(
      props.municipality.municipalityId,
    );
  return (
    <QueryWrapper
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Failed to load municipalities data."
    >
      {(!data || data?.length == 0) && (
        <p className="text-muted-foreground">There is no data</p>
      )}
      {data?.map((ward, index) => {
        return <WardItem key={index} ward={ward} />;
      })}
    </QueryWrapper>
  );
};
