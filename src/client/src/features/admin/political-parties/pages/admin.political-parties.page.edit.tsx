import AddEditPoliticalParty from "@/features/admin/political-parties/components/add-edit-political-party.tsx";
import {useAdminPoliticalPartyQuery} from "@/features/admin/political-parties/api/admin.political-parties.query.ts";

interface AdminEditPoliticalPartiesPageProps {
    politicalPartyId: number;
}
export const AdminEditPoliticalPartiesPage = (props: AdminEditPoliticalPartiesPageProps) => {
    const {data, isLoading, isError} = useAdminPoliticalPartyQuery.getPartyById(props.politicalPartyId);

    if (isLoading) {
        return <> Loading .... </>
    }

    if (isError) {
        return <> Error .... </>;
    }
    
    return (
        <AddEditPoliticalParty
            isEdit = {true}
            politicalPartyInfo={data}
        />
    );
};
