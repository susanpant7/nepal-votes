import { useVotingQuery } from "@/features/voting/api/voting.query.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, VoteIcon, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import type { VotingSection } from "@/features/voting/types/voting.types.ts";

export interface Props {
  gotoSection: (section: VotingSection) => void;
}
export const EligibilitySection = ({ gotoSection }: Props) => {
  const { data, isLoading, isError, refetch } =
    useVotingQuery.getVoterEligibility();

  const eligibility = data;
  return (
    <QueryWrapper isLoading={isLoading} isError={isError} refetch={refetch}>
      <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
        <header className="flex items-center justify-between border-b pb-4">
          <h1 className="text-3xl font-bold tracking-tight">Voting Portal</h1>
          <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Election 2026
          </div>
        </header>

        <Card
          className={`border-t-4 ${eligibility?.canVote ? "border-t-green-500" : "border-t-destructive"}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {eligibility?.canVote ? (
                <CheckCircle2 className="text-green-500 h-6 w-6" />
              ) : (
                <XCircle className="text-destructive h-6 w-6" />
              )}
              Voter Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-muted-foreground">
              {eligibility?.message}
            </p>

            {eligibility?.canVote ? (
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-semibold text-green-800 mb-2">
                  You are all set!
                </h3>
                <p className="text-sm text-green-700 mb-4">
                  Your identity has been verified and no previous records of
                  your vote exist for this election cycle.
                </p>
                <Button
                  className="flex items-center gap-2"
                  onClick={() => gotoSection("INFO")}
                >
                  <VoteIcon className="h-4 w-4" />
                  Proceed to Ballot
                </Button>
              </div>
            ) : (
              <div className="bg-destructive/5 p-4 rounded-lg border border-destructive/10">
                <h3 className="font-semibold text-destructive mb-1">
                  Access Restricted
                </h3>
                <p className="text-sm text-muted-foreground">
                  If you believe this is an error, please contact the election
                  commission or your local administrator.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </QueryWrapper>
  );
};
