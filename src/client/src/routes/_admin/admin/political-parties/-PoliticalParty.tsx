import {usePoliticalPartyQuery} from "@/routes/_admin/admin/political-parties/-api-query.ts";
import PoliticalPartiesTable from "@/routes/_admin/admin/political-parties/-PoliticalPartiesTable.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useNavigate} from "@tanstack/react-router";

const PoliticalParty = () => {
    const {data, isLoading, isError} = usePoliticalPartyQuery();

    const navigate = useNavigate();
    const onEditParty = async (politicalPartyId: number) => {
        await navigate({to:'/admin/political-parties/$partyId', params:{partyId:politicalPartyId}})
    };
    
    const onAddParty = async () => {
        await navigate({to:'/admin/political-parties/add'})
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
        <PoliticalPartiesTable
            parties={data || []}
            onEdit={onEditParty}
            onAdd={onAddParty}
            onDelete={(id) => alert("Delete ID: "+ id)}
        />
    );
};

export default PoliticalParty;