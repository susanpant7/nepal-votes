import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { ChevronRight, Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import type { VotingSection } from "@/features/voting/types/voting.types.ts";

export interface Props {
  gotoSection: (section: VotingSection) => void;
}
export const InfoSection = ({ gotoSection }: Props) => {
  return (
    <Card className="max-w-2xl mx-auto border-none shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2 text-primary mb-2">
          <Info className="h-5 w-5" />
          <span className="font-semibold uppercase tracking-wider text-xs">
            Guidelines
          </span>
        </div>
        <CardTitle className="text-3xl">Before you cast your vote</CardTitle>
        <CardDescription>
          Please read the following instructions carefully.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          <li className="flex gap-3 text-sm">
            <ShieldCheck className="h-5 w-5 text-green-600 shrink-0" />
            You can only vote once. After submission, your choice is final.
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full py-6 text-lg"
          onClick={() => gotoSection("BALLOT")}
        >
          Proceed to Ballot <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};
