import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAdminCandidateMutation } from "@/features/admin/candidates/api/admin.candidates.query.ts";
import type { CandidateListItem } from "@/features/admin/candidates/types/admin.candidates.types.ts";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CandidatesGridProps {
  candidates: CandidateListItem[];
  isLoading?: boolean;
  showEmpty?: boolean;
  emptyMessage?: string;
}

export const CandidatesGrid = ({
  candidates,
  isLoading,
  showEmpty,
  emptyMessage = "No candidates found matching the selected criteria.",
}: CandidatesGridProps) => {
  const { deleteCandidate } = useAdminCandidateMutation();
  const navigate = useNavigate();

  const onEditButtonClick = async (candidateId: number) => {
    await navigate({
      to: ROUTES.ADMIN_CANDIDATES_EDIT,
      params: { candidateId },
    });
  };

  const onDeleteConfirm = async (candidate: CandidateListItem) => {
    await deleteCandidate.mutateAsync({
      candidateId: candidate.candidateId,
      constituencyId: candidate.constituencyId,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (showEmpty || candidates.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidates.map((candidate) => (
        <Card key={candidate.candidateId} className="h-full overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            {/* Candidate Photo */}
            <div className="h-16 w-16 rounded-full border bg-muted p-1 overflow-hidden shrink-0">
              {candidate.imageContent ? (
                <img
                  src={`data:${candidate.imageContentType};base64,${candidate.imageContent}`}
                  alt="Candidate"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : candidate.candidateImageId ? (
                <img
                  src={`https://result.election.gov.np/Images/Candidate/${candidate.candidateImageId}.jpg`}
                  alt="Candidate"
                  className="h-full w-full object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement?.classList.add("bg-gray-200");
                  }}
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center text-xs text-center text-muted-foreground rounded-full">
                  No Img
                </div>
              )}
            </div>

            {/* Name + Party */}
            <div className="flex flex-col flex-1 min-w-0">
              <CardTitle className="text-base leading-tight truncate">
                {candidate.fullName}
              </CardTitle>
              <div className="text-sm text-muted-foreground mt-1">
                {candidate.isIndependent ? (
                  <Badge variant="outline">Independent</Badge>
                ) : (
                  <span className="font-medium text-primary truncate block">
                    {candidate.politicalPartyName}
                  </span>
                )}
              </div>
            </div>

            {/* Symbol */}
            <div className="flex flex-col items-end shrink-0">
              <div className="h-10 w-10" title={candidate.isIndependent ? "Independent Symbol" : "Party Symbol"}>
                {candidate.symbolContent ? (
                  <img
                    src={`data:${candidate.symbolContentType};base64,${candidate.symbolContent}`}
                    alt="Symbol"
                    className="h-full w-full object-contain"
                  />
                ) : null}
              </div>
              {candidate.isIndependent && candidate.symbolName && (
                <span
                  className="text-[10px] text-muted-foreground mt-1 text-right max-w-[80px] truncate"
                  title={candidate.symbolName}
                >
                  {candidate.symbolName}
                </span>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <div className="text-sm space-y-1 mt-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Constituency:</span>
                <span className="font-medium">{candidate.constituencyName}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
              <Button
                onClick={() => onEditButtonClick(candidate.candidateId)}
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Candidate</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove{" "}
                      <strong>{candidate.fullName}</strong> as a candidate? This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDeleteConfirm(candidate)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Keep the old name as an alias so existing imports continue to work
export const CandidatesTable = CandidatesGrid;
