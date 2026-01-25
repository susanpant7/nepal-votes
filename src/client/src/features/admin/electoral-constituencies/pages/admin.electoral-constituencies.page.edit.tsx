import { AddEditConstituency } from "@/features/admin/electoral-constituencies/components/add-edit-constituency.tsx";
import { useAdminConstituencyQuery } from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.query.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { useConstituencyStore } from "@/stores/useConstituencyStore.ts";
import { useEffect } from "react";

export interface EditConstituencyProps {
  constituencyId: number;
}
export const AdminElectoralConstituenciesPageEdit = (
  props: EditConstituencyProps,
) => {
  const constituencyId = props.constituencyId;

  const setConstituency = useConstituencyStore((s) => s.setConstituency);
  const { data, isLoading, isError, refetch } =
    useAdminConstituencyQuery.getConstituencyByConstituencyId(constituencyId);
  //useAdminConstituencyQuery.getConstituencyById(props.constituencyId);

  useEffect(() => {
    if (data) {
      setConstituency(data);
    }
  }, [data]);
  return (
    <QueryWrapper isLoading={isLoading} isError={isError} refetch={refetch}>
      <AddEditConstituency isEdit={true} constituencyDetail={data} />
    </QueryWrapper>
  );
};
