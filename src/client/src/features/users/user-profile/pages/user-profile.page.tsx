import {useAuthStore} from "@/stores/useAuthStore.ts";
import {userProfileQuery} from "@/features/users/user-profile/api/user-profile.query.ts";

export const UserProfilePage = () => {
    const user = useAuthStore(state => state.user);

    const { data: profile, isLoading, isError } = userProfileQuery();
    
    return (
        <div className="p-6 space-y-4">
            <section>
                <h2 className="text-lg font-bold">Basic Info (from Store)</h2>
                <p>User: {user?.userName}</p>
                <p>Mobile: {user?.mobileNumber}</p>
            </section>

            <section className="pt-4 border-t">
                <h2 className="text-lg font-bold">Detailed Profile (from API)</h2>

                {isLoading && <p className="animate-pulse">Loading detailed profile...</p>}

                {isError && <p className="text-destructive">Failed to load voting details.</p>}

                {profile && (
                    <div className="mt-2 space-y-1">
                        <p><strong>Full Name:</strong> {profile.fullName}</p>
                        <p><strong>Voting Address:</strong> {profile.votingPlaceAddress}</p>
                    </div>
                )}
            </section>
        </div>
    );
};