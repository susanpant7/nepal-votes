import {usePoliticalPartyQuery} from "@/routes/_admin/admin/political-parties/-api-query.ts";
import PoliticalPartiesTable from "@/routes/_admin/admin/political-parties/-PoliticalPartiesTable.tsx";
import type {PoliticalPartyInfo} from "@/routes/_admin/admin/political-parties/-api.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const PoliticalParty = () => {
    const {data, isLoading, isError} = usePoliticalPartyQuery();

    const handleEdit = (party: PoliticalPartyInfo) => {
        console.log("Edit party:", party.politicalPartyId);
        // Logic to open Dialog/Modal
    };
    
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
            onEdit={handleEdit}
            onAdd={() => alert("Open Add Modal")}
            onDelete={(id) => alert("Delete ID: "+ id)}
        />
    );
};

export default PoliticalParty;