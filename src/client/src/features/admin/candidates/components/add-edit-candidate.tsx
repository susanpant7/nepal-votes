import type { CandidateDetail } from "@/features/admin/candidates/types/admin.candidates.types.ts";
import { Button } from "@/components/ui/button.tsx";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import { ChevronLeft } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { UserSearchDropdown } from "@/features/users/user-search/components/user-search-dropdown.tsx";
import { useNavigate } from "@tanstack/react-router";
import { ConstituencyDropdownSelect } from "@/features/admin/electoral-constituencies/components/constituency-dropdown-select.tsx";

export interface Props {
  isEdit: boolean;
  candidateDetail?: CandidateDetail;
}
export const AddEditCandidate = (props: Props) => {
  const { isEdit, candidateDetail } = props;

  const navigate = useNavigate();

  const onSubmit = () => {};

  const onConstituencySelect = () => {};

  const onCandidateSelect = () => {};

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: ROUTES.ADMIN_CANDIDATES })}
            className="mb-2 -ml-2 text-muted-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Back to Candidates
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {isEdit ? "Edit Candidate Profile" : "Create Candidate"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Fill in the details below to{" "}
            {isEdit ? "update the" : "register a new"} candidate.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid w-full items-center gap-3">
          <Label>Constituency :</Label>
          <ConstituencyDropdownSelect onChange={onConstituencySelect} />
        </div>

        <div className="grid w-full items-center gap-3">
          <Label>Candidate :</Label>
          <UserSearchDropdown
            onSelect={onCandidateSelect}
            currentUserName={candidateDetail?.candidateName ?? ""}
          />
        </div>

        <Button type="submit" disabled={false}>
          {isEdit ? "Update Party" : "Create Party"}
        </Button>
      </form>
    </div>
  );
};
