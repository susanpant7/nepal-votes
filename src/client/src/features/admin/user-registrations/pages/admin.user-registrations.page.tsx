import { DistrictDropdownSelect } from "@/features/admin/electoral-geographies/components/district-dropdown-select.tsx";
import { useState } from "react";
import type { DistrictDropdown } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { UserRegistrationsTable } from "@/features/admin/user-registrations/components/user-registrations-table.tsx";

export const AdminUserRegistrationsPage = () => {
  const [selectedDistrict, setSelectedDistrict] =
    useState<DistrictDropdown | null>(null);
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">User Registrations</h1>
      </div>
      <div className="w-72">
        <DistrictDropdownSelect
          onSelect={(district) => setSelectedDistrict(district)}
        />
      </div>
      {/* Table */}
      {selectedDistrict ? (
        <UserRegistrationsTable
          districtId={selectedDistrict?.districtId ?? 0}
        />
      ) : (
        <div className="flex h-40 items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
          Select a district to view applicants.
        </div>
      )}
    </div>
  );
};
