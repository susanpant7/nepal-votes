import type { CandidateDetail } from "@/features/admin/candidates/types/admin.candidates.types.ts";

export interface Props {
  isEdit: boolean;
  candidateDetail?: CandidateDetail;
}
export const AddEditCandidate = (props: Props) => {
  const { isEdit, candidateDetail } = props;

  return <div>AddEditCandidate component </div>;
};
