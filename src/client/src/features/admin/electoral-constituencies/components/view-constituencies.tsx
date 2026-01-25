import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper";
import { useState } from "react";
import { useAdminConstituencyQuery } from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.query.ts";
import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";
import { FilterBar } from "@/features/admin/electoral-constituencies/components/filter-bar.tsx";
import { ConstituenciesTable } from "@/features/admin/electoral-constituencies/components/constituency-table.tsx";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/lib/app.routes.urls.ts";

export const ViewConstituencies = () => {
  const navigate = useNavigate();

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

  const onAddConstituency = async () => {
    await navigate({ to: ROUTES.ADMIN_ELECTORAL_CONSTITUENCIES_ADD });
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Constituencies</h1>

        <Button onClick={onAddConstituency}>
          <Plus className="mr-2 h-4 w-4" />
          Add Constituency
        </Button>
      </div>

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
