import { useNavigate, useSearch } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
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
  const searchTerm = search.searchTerm || "";
  const pageNumber = search.pageNumber ? Number(search.pageNumber) : 1;

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const { data, isLoading, isError, refetch } =
    useAdminUserRegistrationQuery.useSearchRegistrations({
      districtId,
      searchTerm,
      pageNumber,
      pageSize: 10,
    });

  const onDistrictSelected = (id: number | undefined) => {
    navigate({
      search: (old: any) => ({ ...old, districtId: id, pageNumber: 1 }),
    });
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      search: (old: any) => ({ ...old, searchTerm: localSearchTerm, pageNumber: 1 }),
    });
  };

  const onPageChange = (page: number) => {
    navigate({
      search: (old: any) => ({ ...old, pageNumber: page }),
    });
  };

  const clearFilters = () => {
    setLocalSearchTerm("");
    navigate({
      search: () => ({ districtId: undefined, searchTerm: "", pageNumber: 1 }),
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
      <div className="flex flex-wrap items-end gap-4 bg-muted/30 p-6 rounded-xl border border-border/50">
        <div className="w-72 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
            Filter by District
          </label>
          <DistrictDropdownSelect
            onSelect={(district) => onDistrictSelected(district.districtId)}
            defaultDistrictId={districtId}
          />
        </div>

        <form onSubmit={onSearchSubmit} className="flex-1 min-w-[300px] space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
            Search Applicants
          </label>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search by name, mobile, or ID number..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              className="pl-10 h-10 border-border/60 focus-visible:ring-primary/20 transition-all"
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Button type="submit" onClick={onSearchSubmit} className="h-10 px-6 font-semibold shadow-sm">
            Search
          </Button>
          {(districtId || searchTerm) && (
            <Button
              variant="outline"
              size="icon"
              onClick={clearFilters}
              className="h-10 w-10 border-border/60 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all"
              title="Clear all filters"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
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
