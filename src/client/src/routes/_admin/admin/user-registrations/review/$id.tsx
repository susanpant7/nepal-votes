import { createFileRoute } from "@tanstack/react-router";
import { AdminUserRegistrationReviewPage } from "@/features/admin/user-registrations/pages/admin.user-registrations.page.review.tsx";

export const Route = createFileRoute(
  "/_admin/admin/user-registrations/review/$id",
)({
  component: ReviewUserRegistration,
});

function ReviewUserRegistration() {
  const { id } = Route.useParams();
  const userRegistrationId = Number(id);
  return (
    <AdminUserRegistrationReviewPage userRegistrationId={userRegistrationId} />
  );
}
