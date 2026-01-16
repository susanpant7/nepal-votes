import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useNavigate} from "@tanstack/react-router";
import {useAdminPoliticalPartyQuery} from "@/features/admin/political-parties/api/admin.political-parties.query.ts";
import {
    AdminPoliticalPartiesTable
} from "@/features/admin/political-parties/components/admin-political-parties-table.tsx";
import {ROUTES} from "@/lib/app.routes.urls.ts";

export const AdminPoliticalPartyPage = () => {
    const {data, isLoading, isError} = useAdminPoliticalPartyQuery.getParties();

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
            <div className="space-y-3 p-6">
                <Skeleton className="h-31.25 w-full rounded-xl" />
                <Skeleton className="h-8 w-62.5" />
                <Skeleton className="h-8 w-full" />
            </div>
        )
    }
    if (isError) {
        return <div>Error</div>;
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