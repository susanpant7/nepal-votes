import { Button } from "@/components/ui/button.tsx";
import type { VotingSection } from "@/features/voting/types/voting.types.ts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { User, Users } from "lucide-react";
import { CandidateSelection } from "@/features/voting/components/candidate-selection.tsx";
import { PartySelection } from "@/features/voting/components/party-selection.tsx";
import { useVotingStore } from "@/stores/useVotingStore.ts";

export interface Props {
  gotoSection: (section: VotingSection) => void;
}
export const BallotSection = ({ gotoSection }: Props) => {
  const selectedCandidate = useVotingStore((s) => s.selectedCandidate);
  const selectedParty = useVotingStore((s) => s.selectedParty);

  const canProceed = selectedCandidate !== null && selectedParty !== null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Official Ballot</h2>
        <p className="text-muted-foreground">
          Cast your vote in both categories. Selection is mandatory for both.
        </p>
      </div>

      <Tabs defaultValue="direct" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="direct" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Direct Candidate
          </TabsTrigger>
          <TabsTrigger value="proportional" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Proportional (Party)
          </TabsTrigger>
        </TabsList>

        {/* --- Direct Candidate Tab --- */}
        <TabsContent value="direct" className="mt-6 space-y-4">
          <CandidateSelection />
        </TabsContent>

        {/* --- Proportional Party Tab --- */}
        <TabsContent value="proportional" className="mt-6 space-y-4">
          <PartySelection />
        </TabsContent>
      </Tabs>

      <div className="pt-4 sticky bottom-0 bg-background/80 backdrop-blur-sm pb-4">
        {!canProceed && (
          <p className="text-xs text-center text-destructive mb-2 font-medium">
            Please make a selection (or "No Vote") in both tabs to proceed.
          </p>
        )}
        <Button
          className="w-full py-6 text-lg shadow-lg"
          disabled={!canProceed}
          onClick={() => gotoSection("CONFIRM")}
        >
          Review Selection
        </Button>
      </div>
    </div>
  );
};
