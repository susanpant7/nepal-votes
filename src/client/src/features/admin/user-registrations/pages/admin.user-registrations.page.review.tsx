import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { useAdminUserRegistrationQuery } from "@/features/admin/user-registrations/api/admin.user-registrations.query.ts";

export interface EditConstituencyProps {
  userRegistrationId: number;
}
export const AdminUserRegistrationReviewPage = (
  props: EditConstituencyProps,
) => {
  const userRegistrationId = props.userRegistrationId;

  const { data, isLoading, isError, refetch } =
    useAdminUserRegistrationQuery.getRegisteredUsersByUserRegistrationId(
      userRegistrationId,
    );

  return (
    <QueryWrapper isLoading={isLoading} isError={isError} refetch={refetch}>
      {/*<RegistrationReview*/}
      {/*  data={formData}*/}
      {/*  onEdit={() => setRegistrationStep("Form")}*/}
      {/*  onConfirm={submitUserDetails}*/}
      {/*  isSubmitting={false}*/}
      {/*/>*/}
      This is th review page
    </QueryWrapper>
  );
};
