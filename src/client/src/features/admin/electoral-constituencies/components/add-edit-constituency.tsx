import type { ConstituencyDetail } from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import { Button } from "@/components/ui/button.tsx";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { FilterBar } from "@/features/admin/electoral-constituencies/components/filter-bar.tsx";
import { useState } from "react";
import { ConstituencyInfoSection } from "@/features/admin/electoral-constituencies/components/constituency-info-section.tsx";
import { ConstituencyMunicipalitiesSection } from "@/features/admin/electoral-constituencies/components/constituency-municipalities-section.tsx";

export interface AddEditConstituencyProps {
  isEdit?: boolean;
  constituencyDetail?: ConstituencyDetail;
}
export const AddEditConstituency = ({
  isEdit,
  constituencyDetail,
}: AddEditConstituencyProps) => {
  const navigate = useNavigate();

  const [districtId, setDistrictId] = useState<number | null>(null);

  const onDistrictChange = (districtId: number) => {
    setDistrictId(districtId);
  };

  const onProvinceChange = () => {
    setDistrictId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="space-y-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            navigate({ to: ROUTES.ADMIN_ELECTORAL_CONSTITUENCIES })
          }
          className="-ml-2 w-fit text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Constituencies
        </Button>

        <h1 className="text-3xl font-bold tracking-tight">
          {isEdit ? "Edit Constituency" : "Create Constituency"}
        </h1>

        <p className="max-w-2xl text-sm text-muted-foreground">
          Fill in the details below to{" "}
          {isEdit ? "update the existing" : "register a new"} electoral
          constituency.
        </p>
      </div>

      {/* Province & District */}
      {isEdit ? (
        <div className="flex">
          <div className="inline-flex items-center gap-4 rounded-lg border bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                Province
              </span>
              <span className="text-sm font-medium">
                {constituencyDetail?.provinceName}
              </span>
            </div>

            <div className="h-5 w-px bg-border" />

            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                District
              </span>
              <span className="text-sm font-medium">
                {constituencyDetail?.districtName}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <FilterBar
          onProvinceChange={onProvinceChange}
          onDistrictChange={onDistrictChange}
        />
      )}

      {/* Main Content */}
      <div className="grid w-full grid-cols-5 gap-6">
        {/* Left: Municipality / Ward Selection */}
        <div className="col-span-3 rounded-xl border bg-card p-4">
          <ConstituencyMunicipalitiesSection
            districtId={
              isEdit ? (constituencyDetail?.districtId ?? null) : districtId
            }
          />
        </div>

        {/* Right: Constituency Info */}
        <div className="col-span-2 rounded-xl border bg-card p-4">
          <ConstituencyInfoSection />
        </div>
      </div>
    </div>
  );
};
