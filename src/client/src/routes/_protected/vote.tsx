import { createFileRoute } from "@tanstack/react-router";
import { VotingPage } from "@/features/voting/pages/voting.page.tsx";

export const Route = createFileRoute("/_protected/vote")({
  component: VotingPage,
});
