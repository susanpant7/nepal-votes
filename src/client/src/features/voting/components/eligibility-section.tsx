import { useVotingQuery } from "@/features/voting/api/voting.query.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle2,
  MapPin,
  VoteIcon,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import type { VotingSection } from "@/features/voting/types/voting.types.ts";
import { Badge } from "@/components/ui/badge.tsx";

export interface Props {
  gotoSection: (section: VotingSection) => void;
}
export const EligibilitySection = ({ gotoSection }: Props) => {
  const { data, isLoading, isError, refetch } =
    useVotingQuery.getVoterEligibility();

  const eligibility = data;
  const canVote = eligibility?.canVote;
  return (
    <QueryWrapper isLoading={isLoading} isError={isError} refetch={refetch}>
      <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Voting Portal
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Official Election Management System
            </p>
          </div>
          <Badge variant="secondary" className="w-fit text-sm px-4 py-1 h-fit">
            Election 2026
          </Badge>
        </header>

        <Card
          className={`relative overflow-hidden border-t-4 ${canVote ? "border-t-emerald-500" : "border-t-destructive"}`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-2xl">
              {canVote ? (
                <CheckCircle2 className="text-emerald-500 h-8 w-8" />
              ) : (
                <XCircle className="text-destructive h-8 w-8" />
              )}
              Voter Eligibility Status
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-lg font-medium leading-relaxed">
              {eligibility?.message}
            </p>

            {canVote ? (
              <div className="relative space-y-6 rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-6 dark:bg-emerald-500/5">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                    Verification Complete
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-2xl">
                    Your identity has been verified and no previous records of
                    your vote exist for this election cycle. You are authorized
                    to proceed.
                  </p>
                </div>

                {/* Enhanced Info Bar */}
                <div className="flex flex-wrap items-center gap-3 px-4 py-2 rounded-lg border bg-background/50 backdrop-blur-sm w-fit shadow-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground border-r pr-3 leading-none">
                    Constituency
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {eligibility?.constituencyName ?? "Not Assigned"}
                  </span>
                </div>

                <Button
                  size="lg"
                  className="w-full sm:w-auto flex items-center gap-2 font-bold shadow-lg shadow-primary/20"
                  onClick={() => gotoSection("INFO")}
                >
                  <VoteIcon className="h-5 w-5" />
                  Proceed to Ballot
                </Button>
              </div>
            ) : (
              <div className="flex gap-4 rounded-xl border border-destructive/20 bg-destructive/5 p-6">
                <AlertCircle className="h-6 w-6 text-destructive shrink-0" />
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-destructive">
                    Access Restricted
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The system has identified restrictions preventing you from
                    voting at this time. If you believe this is an error, please
                    contact the election commission or your local administrator
                    immediately.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </QueryWrapper>
  );
};
