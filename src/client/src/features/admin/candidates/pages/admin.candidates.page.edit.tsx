import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { AddEditCandidate } from "@/features/admin/candidates/components/add-edit-candidate.tsx";
import { useAdminCandidateQuery } from "@/features/admin/candidates/api/admin.candidates.query.ts";

export interface EditConstituencyProps {
  candidateId: number;
}
export const AdminCandidatePageEdit = (props: EditConstituencyProps) => {
  const candidateId = props.candidateId;

  alert("candidate id is edited " + candidateId);
  const { data, isLoading, isError, refetch } =
    useAdminCandidateQuery.getCandidateDetail(candidateId);

  return (
    <QueryWrapper isLoading={isLoading} isError={isError} refetch={refetch}>
      <AddEditCandidate isEdit={true} candidateDetail={data} />
    </QueryWrapper>
  );
};
