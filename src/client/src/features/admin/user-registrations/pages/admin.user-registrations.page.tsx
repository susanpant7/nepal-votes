import { useNavigate, useSearch } from "@tanstack/react-router";
import { X } from "lucide-react";
import { UserRegistrationsTable } from "@/features/admin/user-registrations/components/user-registrations-table.tsx";
import { DistrictDropdownSelect } from "@/features/admin/electoral-geographies/components/district-dropdown-select.tsx";
import { useAdminUserRegistrationQuery } from "@/features/admin/user-registrations/api/admin.user-registrations.query.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useState } from "react";

export const AdminUserRegistrationsPage = () => {
  const navigate = useNavigate({ from: "/admin/user-registrations" });
  const search = useSearch({ from: "/_admin/admin/user-registrations/" });

  const districtId = search.districtId ? Number(search.districtId) : undefined;
  const fullName = search.fullName || "";
  const nationalIdNumber = search.nationalIdNumber || "";
  const voterIdNumber = search.voterIdNumber || "";
  const mobileNumber = search.mobileNumber || "";
  const pageNumber = search.pageNumber ? Number(search.pageNumber) : 1;

  const [localDistrictId, setLocalDistrictId] = useState<number | undefined>(districtId);
  const [localFullName, setLocalFullName] = useState(fullName);
  const [localNationalId, setLocalNationalId] = useState(nationalIdNumber);
  const [localVoterId, setLocalVoterId] = useState(voterIdNumber);
  const [localMobile, setLocalMobile] = useState(mobileNumber);

  const { data, isLoading, isError, refetch } =
    useAdminUserRegistrationQuery.useSearchRegistrations({
      districtId,
      fullName,
      nationalIdNumber,
      voterIdNumber,
      mobileNumber,
      pageNumber,
      pageSize: 10,
    });

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      search: (old: any) => ({
        ...old,
        districtId: localDistrictId,
        fullName: localFullName || undefined,
        nationalIdNumber: localNationalId || undefined,
        voterIdNumber: localVoterId || undefined,
        mobileNumber: localMobile || undefined,
        pageNumber: 1,
      }),
    });
  };

  const onPageChange = (page: number) => {
    navigate({
      search: (old: any) => ({ ...old, pageNumber: page }),
    });
  };

  const clearFilters = () => {
    setLocalDistrictId(undefined);
    setLocalFullName("");
    setLocalNationalId("");
    setLocalVoterId("");
    setLocalMobile("");
    navigate({
      search: () => ({ pageNumber: 1 }),
    });
  };

  return (
    <div className="flex flex-col gap-6 p-8 bg-background min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">User Registrations</h1>
        <p className="text-muted-foreground">
          Manage and review citizen registration applications.
        </p>
      </div>

      {/* Filters Area */}
      <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
        <form onSubmit={onSearchSubmit} className="flex flex-wrap items-end gap-4">
          <div className="w-72 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
              Filter by District
            </label>
            <DistrictDropdownSelect
              onSelect={(district) => setLocalDistrictId(district.districtId)}
              defaultDistrictId={localDistrictId}
            />
          </div>

          <div className="flex-1 min-w-[200px] space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
              Full Name
            </label>
            <Input
              placeholder="e.g. Janak Panta"
              value={localFullName}
              onChange={(e) => setLocalFullName(e.target.value)}
              className="h-10 transition-all font-medium"
            />
          </div>
          <div className="w-[180px] space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
              National ID
            </label>
            <Input
              placeholder="e.g. 123456"
              value={localNationalId}
              onChange={(e) => setLocalNationalId(e.target.value)}
              className="h-10 transition-all"
            />
          </div>
          <div className="w-[180px] space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
              Voter ID
            </label>
            <Input
              placeholder="e.g. 987654"
              value={localVoterId}
              onChange={(e) => setLocalVoterId(e.target.value)}
              className="h-10 transition-all"
            />
          </div>
          <div className="w-[180px] space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
              Mobile Number
            </label>
            <Input
              placeholder="e.g. 9840000000"
              value={localMobile}
              onChange={(e) => setLocalMobile(e.target.value)}
              className="h-10 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button type="submit" onClick={onSearchSubmit} className="h-10 px-6 font-semibold shadow-sm">
              Search
            </Button>
            {(districtId || fullName || nationalIdNumber || voterIdNumber || mobileNumber) && (
              <Button
                variant="outline"
                type="button"
                size="icon"
                onClick={clearFilters}
                className="h-10 w-10 border-border/60 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all"
                title="Clear all filters"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden min-h-[400px]">
        <UserRegistrationsTable
          data={data}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};
