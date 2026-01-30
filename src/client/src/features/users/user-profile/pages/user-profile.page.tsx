import { useUserProfileQuery } from "@/features/users/user-profile/api/user-profile.query.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";

export const UserProfilePage = () => {
  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useUserProfileQuery.getUserProfile();

  return (
    <QueryWrapper isLoading={isLoading} isError={isError} refetch={refetch}>
      <div className="p-6 space-y-4">
        <section className="pt-4 border-t">
          {profile && (
            <div className="mt-2 space-y-1">
              <p>
                <strong>Full Name:</strong> {profile.fullName}
              </p>
              <p>
                <strong>Constituency Name:</strong> {profile.constituencyName}
              </p>
              <p>
                <strong>Voting Address:</strong> {profile.votingPlaceAddress}
              </p>
            </div>
          )}
        </section>
      </div>
    </QueryWrapper>
  );
};
