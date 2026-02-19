
import { CandidateFilters, type CandidateFilterValues } from "@/features/candidate/components/candidate.filters";
import { CandidateList } from "@/features/candidate/components/candidate.list";
import { useCandidateQuery } from "@/features/candidate/api/candidate.query";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

export const CandidatePage = () => {
  const [filters, setFilters] = useState<CandidateFilterValues>({
    provinceIds: [],
    districtIds: [],
    constituencyIds: [],
    politicalPartyIds: [],
    isIndependent: false,
  });

  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Load all constituencies with their districtId + provinceId so we can translate
  // province/district selections into constituency IDs for the backend query
  const { data: allConstituencies = [] } = useCandidateQuery.useGetAllConstituencies();

  // Derive effective constituency IDs from whichever geographic filters are set:
  // - specific constituencies selected → use those directly
  // - districts selected (no specific constituencies) → all constituencies in those districts
  // - only provinces selected → all constituencies in those provinces
  // - nothing selected → no constituency filter (show all)
  const effectiveConstituencyIds = useMemo(() => {
    const { constituencyIds, districtIds, provinceIds } = filters;

    if (constituencyIds.length > 0) {
      return constituencyIds;
    }

    if (districtIds.length > 0) {
      return allConstituencies
        .filter((c) => districtIds.includes(c.districtId))
        .map((c) => c.constituencyId);
    }

    if (provinceIds.length > 0) {
      return allConstituencies
        .filter((c) => provinceIds.includes(c.provinceId))
        .map((c) => c.constituencyId);
    }

    return [];
  }, [filters, allConstituencies]);

  const { data: pagedResult, isLoading: isQueryLoading } = useCandidateQuery.useGetCandidates({
    page,
    pageSize,
    constituencyIds: effectiveConstituencyIds.length > 0 ? effectiveConstituencyIds : undefined,
    politicalPartyIds: filters.politicalPartyIds.length > 0 ? filters.politicalPartyIds : undefined,
    isIndependent: filters.isIndependent || undefined,
  });

  const candidateItems = pagedResult?.items || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Candidates</h1>

      <CandidateFilters onFilterChange={(newFilters) => {
        setFilters(newFilters);
        setPage(1);
      }} />

      {isQueryLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <CandidateList candidates={candidateItems} />

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || isQueryLoading}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {pagedResult?.pageNumber || 1} of {pagedResult?.totalPages || 1}
              {pagedResult && <span className="ml-2 text-muted-foreground">({pagedResult.totalCount} candidates)</span>}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage(p => p + 1)}
              disabled={!pagedResult?.hasNextPage || isQueryLoading}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
