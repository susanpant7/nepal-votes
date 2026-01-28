import { Card, CardContent } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { VotingSection } from "@/features/voting/types/voting.types.ts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { Ban, User, Users } from "lucide-react";
import { useState } from "react";

export interface Props {
  gotoSection: (section: VotingSection) => void;
}
export const BallotSection = ({ gotoSection }: Props) => {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(
    null,
  );
  const [selectedParty, setSelectedParty] = useState<number | null>(null);

  const canProceed = selectedCandidate !== null && selectedParty !== null;

  const NO_VOTE_ID = 0;

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
          <div className="pb-2">
            <h3 className="font-medium">Candidate Selection</h3>
          </div>

          {[1, 2, 3].map((id) => (
            <SelectionCard
              key={id}
              id={id}
              title={`Candidate Name ${id}`}
              subtitle="Independent / Local Party"
              isSelected={selectedCandidate === id}
              onSelect={() => setSelectedCandidate(id)}
              type="candidate"
            />
          ))}

          <NoVoteCard
            isSelected={selectedCandidate === NO_VOTE_ID}
            onSelect={() => setSelectedCandidate(NO_VOTE_ID)}
          />
        </TabsContent>

        {/* --- Proportional Party Tab --- */}
        <TabsContent value="proportional" className="mt-6 space-y-4">
          <div className="pb-2">
            <h3 className="font-medium">Party Selection</h3>
          </div>

          {[101, 102, 103].map((id) => (
            <SelectionCard
              key={id}
              id={id}
              title={`Political Party Alpha ${id}`}
              subtitle="National Alliance"
              isSelected={selectedParty === id}
              onSelect={() => setSelectedParty(id)}
              type="party"
            />
          ))}

          <NoVoteCard
            isSelected={selectedParty === NO_VOTE_ID}
            onSelect={() => setSelectedParty(NO_VOTE_ID)}
          />
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

// --- Reusable Components ---

const SelectionCard = ({
  id,
  title,
  subtitle,
  isSelected,
  onSelect,
  type,
}: any) => (
  <Card
    className={`cursor-pointer transition-all border-2 ${
      isSelected
        ? "border-primary bg-primary/5 shadow-sm"
        : "hover:border-primary/30"
    }`}
    onClick={onSelect}
  >
    <CardContent className="flex items-center justify-between p-5">
      <div className="flex items-center gap-4">
        <div
          className={`h-12 w-12 rounded-lg flex items-center justify-center font-bold ${
            type === "candidate"
              ? "bg-secondary text-secondary-foreground"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {type === "candidate" ? "C" : "P"}
          {id}
        </div>
        <div>
          <p className="font-bold text-lg leading-none mb-1">{title}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div
        className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          isSelected ? "border-primary bg-primary" : "border-muted"
        }`}
      >
        {isSelected && <div className="h-2 w-2 bg-white rounded-full" />}
      </div>
    </CardContent>
  </Card>
);

const NoVoteCard = ({
  isSelected,
  onSelect,
}: {
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <Card
    className={`cursor-pointer transition-all border-2 border-dashed ${
      isSelected ? "border-slate-600 bg-slate-50" : "hover:border-slate-400"
    }`}
    onClick={onSelect}
  >
    <CardContent className="flex items-center justify-between p-5 italic">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-lg bg-slate-200 flex items-center justify-center text-slate-600">
          <Ban className="h-6 w-6" />
        </div>
        <div>
          <p className="font-semibold text-lg text-slate-700 leading-none mb-1">
            None of the Above
          </p>
          <p className="text-sm text-slate-500 tracking-tight">
            Cast an empty/neutral vote for this category
          </p>
        </div>
      </div>
      <div
        className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          isSelected ? "border-slate-600 bg-slate-600" : "border-muted"
        }`}
      >
        {isSelected && <div className="h-2 w-2 bg-white rounded-full" />}
      </div>
    </CardContent>
  </Card>
);
