import { Ban, CheckCircle2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useVotingStore } from "@/stores/useVotingStore.ts";
import { useOverlayStore } from "@/stores/useOverlayStore.ts";
import { useVotingMutation } from "@/features/voting/api/voting.query.ts";
import { getActualLocation } from "@/lib/locationHelper.ts";
import type { VotingSection } from "@/features/voting/types/voting.types.ts";

interface Props {
  gotoSection: (section: VotingSection) => void;
}

export const ConfirmSection = ({ gotoSection }: Props) => {
  const selectedCandidate = useVotingStore((s) => s.selectedCandidate);
  const selectedParty = useVotingStore((s) => s.selectedParty);
  const { submitVote } = useVotingMutation();
  const { showOverlay, hideOverlay } = useOverlayStore();

  const onConfirmClick = async () => {
    try {
      // 1. Attempt to get location first
      // If user denies, this throws and jumps to 'catch'
      const locationInfo = await getActualLocation();

      // 2. Only if successful, show overlay and proceed
      showOverlay();

      const success = await submitVote.mutateAsync({
        partyId: selectedParty?.partyId!,
        candidateId: selectedCandidate?.candidateId!,
        votedFromLocation: locationInfo,
      });

      if (success) gotoSection("SUCCESS");
      else gotoSection("ERROR");
    } catch (err: any) {
      if (err.message === "LOCATION_DENIED") {
        alert(
          "Location access is required to cast your vote. Please enable it in your browser settings.",
        );
      } else {
        console.error("Submission error:", err);
        // Handle other errors (API failures, etc.)
      }
    } finally {
      hideOverlay();
    }
  };

  const SelectionDisplay = ({
    title,
    name,
    content,
    contentType,
    isNoSelection,
  }: {
    title: string;
    name?: string;
    content?: string;
    contentType?: string;
    isNoSelection: boolean;
  }) => (
    <div className="flex flex-col items-center p-4 rounded-xl border bg-background/50 shadow-sm">
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
        {title}
      </span>

      <div className="relative w-32 h-32 mb-4 flex items-center justify-center bg-white rounded-lg border shadow-inner overflow-hidden">
        {isNoSelection ? (
          <div className="flex flex-col items-center text-muted-foreground/40">
            <Ban className="w-10 h-10" />
            <span className="text-[10px] mt-1 font-medium">Empty</span>
          </div>
        ) : (
          <img
            src={`data:${contentType};base64,${content}`}
            alt="Symbol"
            className="max-w-[80%] max-h-[80%] object-contain p-1"
          />
        )}
      </div>

      <h3
        className={cn(
          "text-lg font-black text-center leading-tight line-clamp-2 h-12 flex items-center",
          isNoSelection
            ? "text-muted-foreground/60 italic font-medium"
            : "text-foreground",
        )}
      >
        {isNoSelection ? "No Selection Made" : name}
      </h3>
    </div>
  );

  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-t-4 border-t-primary">
      <CardHeader className="text-center space-y-1">
        <div className="flex justify-center mb-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-black tracking-tight">
          Review Your Ballot
        </CardTitle>
        <CardDescription>
          Please verify your choices before casting your final vote.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-2">
        <SelectionDisplay
          title="Direct Candidate"
          name={selectedCandidate?.candidateName}
          content={selectedCandidate?.symbolContent}
          contentType={selectedCandidate?.symbolContentType}
          isNoSelection={
            !selectedCandidate || selectedCandidate.candidateId === -1
          }
        />
        <SelectionDisplay
          title="Political Party"
          name={selectedParty?.partyName}
          content={selectedParty?.symbolContent}
          contentType={selectedParty?.symbolContentType}
          isNoSelection={!selectedParty || selectedParty.partyId === -1}
        />
      </CardContent>

      <CardFooter className="flex flex-col gap-3 p-6 mt-4 bg-muted/30 rounded-b-xl border-t">
        <Button
          className="w-full h-12 text-md font-bold shadow-lg"
          onClick={onConfirmClick}
        >
          Confirm & Cast Vote
        </Button>
        <Button
          variant="ghost"
          className="w-full text-muted-foreground hover:text-foreground"
          onClick={() => gotoSection("BALLOT")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Change Selection
        </Button>
      </CardFooter>
    </Card>
  );
};
