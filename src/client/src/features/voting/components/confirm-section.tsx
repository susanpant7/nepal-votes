import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import type { VotingSection } from "@/features/voting/types/voting.types.ts";

export interface Props {
  gotoSection: (section: VotingSection) => void;
}
export const ConfirmSection = ({ gotoSection }: Props) => {
  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Final Confirmation</CardTitle>
        <CardDescription>Please confirm your selection below.</CardDescription>
      </CardHeader>
      <CardContent className="bg-muted/50 p-6 rounded-lg m-6 text-center border">
        <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-2">
          You are voting for
        </p>
        <h3 className="text-2xl font-black">Candidate Name : XXXX</h3>
        <Badge variant="outline" className="mt-2">
          National Constituency
        </Badge>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button
          className="w-full variant-default"
          size="lg"
          onClick={() => gotoSection("SUCCESS")}
        >
          Confirm & Cast Vote
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => gotoSection("BALLOT")}
        >
          Change Selection
        </Button>
      </CardFooter>
    </Card>
  );
};
