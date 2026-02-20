import { useNavigate } from "@tanstack/react-router";
import { useAdminPoliticalPartyQuery } from "@/features/admin/political-parties/api/admin.political-parties.query.ts";
import {
    AdminPoliticalPartiesTable
} from "@/features/admin/political-parties/components/admin-political-parties-table.tsx";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import { ErrorState } from "@/components/error/ErrorState.tsx";
import { LoadingState } from "@/components/loading/loading-state.tsx";
import { AdminPage, AdminPageContent, AdminPageHeader } from "@/features/admin/layout/components/admin-page-layout.tsx";
import { Flag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

export const AdminPoliticalPartyPage = () => {
    const { data, isLoading, isError, refetch } = useAdminPoliticalPartyQuery.getParties();

    const navigate = useNavigate();
    const onEditParty = async (politicalPartyId: number) => {
        await navigate({
            to: ROUTES.ADMIN_POLITICAL_PARTIES_EDIT,
            params: { partyId: politicalPartyId }
        })
    };

    const onAddParty = async () => {
        await navigate({ to: ROUTES.ADMIN_POLITICAL_PARTIES_ADD });
    }

    if (isLoading) {
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
        <AdminPage>
            <AdminPageHeader
                title="Political Parties"
                description="Manage registered political entities and their details."
                icon={<Flag className="h-8 w-8" />}
                actions={
                    <Button onClick={onAddParty} size="sm" className="shadow-sm">
                        <Plus className="mr-2 h-4 w-4" /> Add Party
                    </Button>
                }
            />
            <AdminPageContent>
                <div className="pb-6">
                    <AdminPoliticalPartiesTable
                        parties={data || []}
                        onEdit={onEditParty}
                        onAdd={onAddParty}
                        onDelete={(id) => alert("Delete ID: " + id)}
                    />
                </div>
            </AdminPageContent>
        </AdminPage>
    );
};