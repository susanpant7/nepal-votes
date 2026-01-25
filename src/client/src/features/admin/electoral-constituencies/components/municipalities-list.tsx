import { useAdminElectoralGeographyQuery } from "@/features/admin/electoral-geographies/api/admin.electoral-geographies.query.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { MunicipalityItem } from "@/features/admin/electoral-constituencies/components/municipality-item.tsx";

export interface MunicipalitiesListProps {
  districtId: number;
}
export const MunicipalitiesList = (props: MunicipalitiesListProps) => {
  const { data, isLoading, isError, refetch } =
    useAdminElectoralGeographyQuery.getMunicipalitiesByDistrictId(
      props.districtId,
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
      {data?.map((municipality, index) => {
        return <MunicipalityItem key={index} municipality={municipality} />;
      })}
    </QueryWrapper>
  );
};
