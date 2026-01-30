import { useVotingQuery } from "@/features/voting/api/voting.query.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";
import type { VoterCandidateSelectOptions } from "@/features/voting/types/voting.types.ts";
import { Ban, CheckCircle2 } from "lucide-react";
import { useVotingStore } from "@/stores/useVotingStore.ts";

export const CandidateSelection = () => {
  const selectedCandidate = useVotingStore((s) => s.selectedCandidate);
  const setSelectedCandidate = useVotingStore((s) => s.setSelectedCandidate);
  const handleSelect = (candidate: VoterCandidateSelectOptions) => {
    setSelectedCandidate(candidate);
  };
  const handleNoCandidateSelect = () => {
    setSelectedCandidate({
      candidateId: -1,
      candidateName: "No Vote",
      symbolContent: "",
      symbolContentType: "",
      symbolFileName: "No Vote",
    });
  };
  const { data, isLoading, isError, refetch } =
    useVotingQuery.getVoterCandidates();

  return (
    <QueryWrapper isLoading={isLoading} isError={isError} refetch={refetch}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {data?.map((candidate: VoterCandidateSelectOptions) => {
          const isSelected =
            selectedCandidate?.candidateId === candidate.candidateId;

          return (
            <Card
              key={candidate.candidateId}
              onClick={() => handleSelect(candidate)}
              className={cn(
                "group cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden border-2 relative",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                  : "hover:shadow-lg hover:border-primary/30",
              )}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 z-10">
                  <CheckCircle2 className="w-6 h-6 text-primary fill-white" />
                </div>
              )}

              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="relative w-full aspect-square flex items-center justify-center bg-white rounded-lg p-2">
                  <img
                    src={`data:${candidate.symbolContentType};base64,${candidate.symbolContent}`}
                    alt={candidate.symbolFileName}
                    className={cn(
                      "max-w-full max-h-full object-contain transition-transform duration-300",
                      isSelected ? "scale-110" : "group-hover:scale-105",
                    )}
                  />
                </div>
                <p
                  className={cn(
                    "mt-4 font-bold text-center transition-colors",
                    isSelected ? "text-primary" : "text-foreground",
                  )}
                >
                  {candidate.candidateName}
                </p>
              </CardContent>
            </Card>
          );
        })}

        {/* No Selection Card */}
        <Card
          onClick={() => handleNoCandidateSelect()}
          className={cn(
            "group cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden border-2 border-dashed relative",
            selectedCandidate?.candidateId === -1
              ? "border-destructive bg-destructive/5 shadow-md scale-[1.02]"
              : "hover:shadow-lg hover:border-destructive/30",
          )}
        >
          {selectedCandidate?.candidateId === -1 && (
            <div className="absolute top-2 right-2 z-10">
              <CheckCircle2 className="w-6 h-6 text-destructive fill-white" />
            </div>
          )}

          <CardContent className="p-6 flex flex-col items-center justify-center h-full">
            <div className="relative w-full aspect-square flex flex-col items-center justify-center bg-muted/30 rounded-lg p-2">
              <Ban
                className={cn(
                  "w-16 h-16 transition-colors",
                  selectedCandidate?.candidateId === -1
                    ? "text-destructive"
                    : "text-muted-foreground group-hover:text-destructive",
                )}
              />
              <span
                className={cn(
                  "mt-4 font-bold transition-colors",
                  selectedCandidate?.candidateId === -1
                    ? "text-destructive"
                    : "text-muted-foreground group-hover:text-destructive",
                )}
              >
                NO SELECTION
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </QueryWrapper>
  );
};
