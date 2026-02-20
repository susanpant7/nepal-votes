import { Button } from "@/components/ui/button.tsx";
import { Plus, Users2 } from "lucide-react";
import { CandidatesGrid } from "@/features/admin/candidates/components/candidates-table.tsx";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import { CandidateFilters, type CandidateFilterValues } from "@/features/candidate/components/candidate.filters.tsx";
import { useState, useMemo } from "react";
import { useCandidateQuery } from "@/features/candidate/api/candidate.query.ts";
import { AdminPage, AdminPageContent, AdminPageHeader } from "@/features/admin/layout/components/admin-page-layout.tsx";

export const AdminCandidatesPage = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<CandidateFilterValues>({
    provinceIds: [],
    districtIds: [],
    constituencyIds: [],
    politicalPartyIds: [],
    isIndependent: false,
  });

  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Translate province/district selections into constituency IDs (same logic as public page)
  const { data: allConstituencies = [] } = useCandidateQuery.useGetAllConstituencies();

  const effectiveConstituencyIds = useMemo(() => {
    const { constituencyIds, districtIds, provinceIds } = filters;

    if (constituencyIds.length > 0) return constituencyIds;

    if (districtIds.length > 0)
      return allConstituencies
        .filter((c) => districtIds.includes(c.districtId))
        .map((c) => c.constituencyId);

    if (provinceIds.length > 0)
      return allConstituencies
        .filter((c) => provinceIds.includes(c.provinceId))
        .map((c) => c.constituencyId);

    return [];
  }, [filters, allConstituencies]);

  const { data: pagedResult, isLoading } = useCandidateQuery.useGetCandidates({
    page,
    pageSize,
    constituencyIds: effectiveConstituencyIds.length > 0 ? effectiveConstituencyIds : undefined,
    politicalPartyIds: filters.politicalPartyIds.length > 0 ? filters.politicalPartyIds : undefined,
    isIndependent: filters.isIndependent || undefined,
  });

  const hasAnyFilter =
    filters.provinceIds.length > 0 ||
    filters.districtIds.length > 0 ||
    filters.constituencyIds.length > 0 ||
    filters.politicalPartyIds.length > 0 ||
    filters.isIndependent;

  const candidateItems = pagedResult?.items ?? [];

  const onAddCandidateButtonClick = async () => {
    await navigate({ to: ROUTES.ADMIN_CANDIDATES_ADD });
  };

  return (
    <AdminPage>
      <AdminPageHeader
        title="Candidates"
        description="Manage political candidates and their profiles."
        icon={<Users2 className="h-8 w-8" />}
        actions={
          <Button onClick={onAddCandidateButtonClick} size="sm" className="shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Candidate
          </Button>
        }
      />

      <AdminPageContent>
        <div className="space-y-6 pb-6">
          {/* Filters — same component as the public candidate page */}
          <CandidateFilters
            onFilterChange={(newFilters) => {
              setFilters(newFilters);
              setPage(1);
            }}
          />

          {/* Grid */}
          <CandidatesGrid
            candidates={candidateItems}
            isLoading={isLoading}
            showEmpty={!hasAnyFilter && candidateItems.length === 0 && !isLoading}
            emptyMessage={
              hasAnyFilter
                ? "No candidates found matching the selected criteria."
                : "Use the filters above to find candidates."
            }
          />

          {/* Pagination */}
          {(pagedResult?.totalPages ?? 0) > 1 && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || isLoading}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {pagedResult?.pageNumber ?? 1} of {pagedResult?.totalPages ?? 1}
                {pagedResult && (
                  <span className="ml-2 text-muted-foreground">
                    ({pagedResult.totalCount} candidates)
                  </span>
                )}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                disabled={!pagedResult?.hasNextPage || isLoading}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </AdminPageContent>
    </AdminPage>
  );
};
