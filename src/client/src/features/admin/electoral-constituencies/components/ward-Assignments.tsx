import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { WardAssignmentItem } from "@/features/admin/electoral-constituencies/components/ward-assignment-item.tsx";
import { useAdminConstituencyQuery } from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.query.ts";
import type { MunicipalityInfo } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";

export interface WardsListProps {
  municipality: MunicipalityInfo;
}
export const WardAssignments = (props: WardsListProps) => {
  const { data, isLoading, isError, refetch } =
    useAdminConstituencyQuery.getWardAssignmentsByMunicipalityId(
      props.municipality.municipalityId,
    );
  return (
    <QueryWrapper
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Failed to load wards for the selected municipalities."
    >
      {(!data || data?.length == 0) && (
        <p className="text-muted-foreground">There is no data</p>
      )}
      {data?.map((wardWithConstituency, index) => {
        return (
          <WardAssignmentItem
            key={index}
            municipality={props.municipality}
            wardWithConstituency={wardWithConstituency}
          />
        );
      })}
    </QueryWrapper>
  );
};
