import { useAdminElectoralGeographyQuery } from "@/features/admin/electoral-geographies/api/admin.electoral-geographies.query.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { ProvinceItem } from "@/features/admin/electoral-constituencies/components/ProvinceItem.tsx";

export const ProvincesList = () => {
  const { data, isLoading, isError, refetch } =
    useAdminElectoralGeographyQuery.getProvinces();

  return (
    <QueryWrapper
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Failed to load provinces data."
    >
      {(!data || data?.length == 0) && (
        <p className="text-muted-foreground">Hello, there is no data</p>
      )}
      {data?.map((province, index) => {
        return <ProvinceItem key={index} province={province} />;
      })}
    </QueryWrapper>
  );
};
