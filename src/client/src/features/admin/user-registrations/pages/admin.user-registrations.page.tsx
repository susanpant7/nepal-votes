import { DistrictDropdownSelect } from "@/features/admin/electoral-geographies/components/district-dropdown-select.tsx";
import { useState } from "react";
import { UserRegistrationsTable } from "@/features/admin/user-registrations/components/user-registrations-table.tsx";
import { useGlobalStore } from "@/stores/useGlobalStore.ts";

export const AdminUserRegistrationsPage = () => {
  const defaultDistrictId = useGlobalStore((s) => s.userRegistrationDistrictId);
  const setDefaultDistrictId = useGlobalStore(
    (s) => s.setUserRegistrationDistrictId,
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(
    defaultDistrictId,
  );
  const onDistrictSelected = (districtId: number) => {
    setSelectedDistrictId(districtId);
    setDefaultDistrictId(districtId);
  };
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">User Registrations</h1>
      </div>
      <div className="w-72">
        <DistrictDropdownSelect
          onSelect={(district) => onDistrictSelected(district.districtId)}
          defaultDistrictId={selectedDistrictId}
        />
      </div>
      {/* Table */}
      {selectedDistrictId ? (
        <UserRegistrationsTable districtId={selectedDistrictId ?? 0} />
      ) : (
        <div className="flex h-40 items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
          Select a district to view applicants.
        </div>
      )}
    </div>
  );
};
