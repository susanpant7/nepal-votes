import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminCandidateQuery } from "@/features/admin/candidates/api/admin.candidates.query.ts";
import type { ConstituencyDropdown } from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import type { CandidateListItem } from "@/features/admin/candidates/types/admin.candidates.types.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { ConstituencyDropdownSelect } from "@/features/admin/electoral-constituencies/components/constituency-dropdown-select.tsx";
import { ScrollableTableBody } from "@/components/table/scrollable-table-body.tsx";
import { useCandidateStore } from "@/stores/useCandidateStore.ts";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/lib/app.routes.urls.ts";

export const CandidatesTable = () => {
  const constituencyId = useCandidateStore((s) => s.constituencyId);
  const setConstituencyId = useCandidateStore((s) => s.setConstituencyId);

  const { data, isLoading, isError, refetch } =
    useAdminCandidateQuery.getCandidatesByConstituencyId(constituencyId ?? 0);

  const onConstituencySelect = (constituency: ConstituencyDropdown) => {
    setConstituencyId(constituency.constituencyId);
  };

  const candidates = data ?? ([] as CandidateListItem[]);

  const navigate = useNavigate();
  const onEditButtonClick = async (candidateId: number) => {
    await navigate({
      to: ROUTES.ADMIN_CANDIDATES_EDIT,
      params: { candidateId: candidateId },
    });
  };
  return (
    <QueryWrapper isLoading={isLoading} refetch={refetch} isError={isError}>
      <div className="mb-4 w-64">
        <ConstituencyDropdownSelect
          onSelect={onConstituencySelect}
          defaultConstituencyId={constituencyId}
        />
      </div>
      {!constituencyId ? (
        <div className="flex h-40 items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
          Select a constituency to view candidates.
        </div>
      ) : (
        <ScrollableTableBody maxHeight={"600px"}>
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted/50 backdrop-blur-sm shadow-sm">
              <TableRow className="hover:bg-transparent border-b-2 border-border">
                <TableHead className="w-24 h-14 align-middle font-bold text-foreground">
                  Symbol
                </TableHead>
                <TableHead className="h-14 align-middle font-bold text-foreground">
                  Candidate Name
                </TableHead>
                <TableHead className="h-14 align-middle font-bold text-foreground">
                  Party / Affiliation
                </TableHead>
                <TableHead className="h-14 align-middle font-bold text-foreground">
                  Constituency
                </TableHead>
                <TableHead className="text-right h-14 align-middle font-bold text-foreground pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.length > 0 ? (
                candidates?.map((candidate) => (
                  <TableRow key={candidate.candidateId} className="group">
                    <TableCell className="align-middle">
                      <div className="h-12 w-12 rounded border bg-white p-1 shadow-sm">
                        <img
                          src={`data:${candidate.symbolContentType};base64,${candidate.symbolContent}`}
                          alt="Symbol"
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="align-middle font-medium">
                      {candidate.fullName}
                    </TableCell>
                    <TableCell className="align-middle">
                      {candidate.isIndependent ? (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                          Independent
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {candidate.politicalPartyName}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="align-middle text-muted-foreground">
                      {candidate.constituencyName}
                    </TableCell>
                    <TableCell className="text-right align-middle pr-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() =>
                            onEditButtonClick(candidate.candidateId)
                          }
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-48 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <p>No registration records found for this district.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollableTableBody>
      )}
    </QueryWrapper>
  );
};
