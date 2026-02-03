import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { useAdminUserRegistrationQuery } from "@/features/admin/user-registrations/api/admin.user-registrations.query.ts";
import UserRegistrationReview from "@/features/admin/user-registrations/components/user-registration-review.tsx";

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
      <UserRegistrationReview userReviewData={data!} />
    </QueryWrapper>
  );
};
