import {useNavigate} from "@tanstack/react-router";
import {useAdminPoliticalPartyQuery} from "@/features/admin/political-parties/api/admin.political-parties.query.ts";
import {
    AdminPoliticalPartiesTable
} from "@/features/admin/political-parties/components/admin-political-parties-table.tsx";
import {ROUTES} from "@/lib/app.routes.urls.ts";
import {ErrorState} from "@/components/error/ErrorState.tsx";
import {LoadingState} from "@/components/loading/loading-state.tsx";

export const AdminPoliticalPartyPage = () => {
    const {data, isLoading, isError, refetch} = useAdminPoliticalPartyQuery.getParties();

    const navigate = useNavigate();
    const onEditParty = async (politicalPartyId: number) => {
        await navigate({
            to:ROUTES.ADMIN_POLITICAL_PARTIES_EDIT, 
            params:{partyId:politicalPartyId}
        })
    };
    
    const onAddParty = async () => {
        await navigate({to:ROUTES.ADMIN_POLITICAL_PARTIES_ADD});
    }
    
    if(isLoading) {
        return (
            <LoadingState />
        )
    }
    if (isError) {
        return (
            <ErrorState
                message="Failed to load political parties page."
                onRetry={refetch}
            />
        );
    }
    return (
        <AdminPoliticalPartiesTable
            parties={data || []}
            onEdit={onEditParty}
            onAdd={onAddParty}
            onDelete={(id) => alert("Delete ID: "+ id)}
        />
    );
};