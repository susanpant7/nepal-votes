import { useVotingQuery } from "@/features/voting/api/voting.query.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";
import type { VoterCandidateSelectOptions } from "@/features/voting/types/voting.types.ts";
import { Ban, User } from "lucide-react";
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
      candidateImageContent: "",
      candidateImageContentType: "",
      candidateImageFileName: "",
      candidateImageId: -1,
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
                <div className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-1 shadow-sm backdrop-blur-sm">
                  <img src="https://assets-generalelection2082.ekantipur.com/parties/party-1770810367.png" alt="Selected" className="w-8 h-8 object-contain drop-shadow-md" />
                </div>
              )}

              <CardContent className="p-6 flex flex-col items-center justify-center relative">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-4 flex-shrink-0">
                  {/* Candidate Portrait */}
                  <div className={cn(
                    "w-full h-full rounded-full border-4 shadow-md overflow-hidden bg-muted flex items-center justify-center transition-all duration-300",
                    isSelected ? "border-primary" : "border-background"
                  )}>
                    {candidate.candidateImageContent ? (
                      <img
                        src={`data:${candidate.candidateImageContentType};base64,${candidate.candidateImageContent}`}
                        alt={candidate.candidateName}
                        className={cn(
                          "w-full h-full object-cover transition-transform duration-500",
                          isSelected ? "scale-110" : "group-hover:scale-105"
                        )}
                      />
                    ) : candidate.candidateImageId && candidate.candidateImageId > 0 ? (
                      <img
                        src={`https://result.election.gov.np/Images/Candidate/${candidate.candidateImageId}.jpg`}
                        alt={candidate.candidateName}
                        className={cn(
                          "w-full h-full object-cover transition-transform duration-500",
                          isSelected ? "scale-110" : "group-hover:scale-105"
                        )}
                        onError={(e) => {
                          // Fallback if the external image doesn't exist
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                          const fallbackIcon = document.createElement('div');
                          fallbackIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground/30"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
                          e.currentTarget.parentElement?.appendChild(fallbackIcon.firstChild as Node);
                        }}
                      />
                    ) : (
                      <User className="w-12 h-12 text-muted-foreground/30" />
                    )}
                  </div>

                  {/* Party Symbol floating badge */}
                  {candidate.symbolContent && (
                    <div className="absolute -bottom-2 -right-2 z-10 w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full border-2 border-muted shadow-lg p-1.5 flex items-center justify-center transition-transform hover:scale-110">
                      <img
                        src={`data:${candidate.symbolContentType};base64,${candidate.symbolContent}`}
                        alt={candidate.symbolFileName}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                </div>

                <h3
                  className={cn(
                    "mt-2 text-lg font-bold text-center leading-tight transition-colors",
                    isSelected ? "text-primary" : "text-foreground"
                  )}
                >
                  {candidate.candidateName}
                </h3>
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
            <div className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-1 shadow-sm backdrop-blur-sm">
              <img src="https://assets-generalelection2082.ekantipur.com/parties/party-1770810367.png" alt="Selected" className="w-8 h-8 object-contain drop-shadow-md grayscale opacity-80" />
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
