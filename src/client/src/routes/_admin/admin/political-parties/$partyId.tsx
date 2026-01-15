import { createFileRoute } from '@tanstack/react-router'
import AddEditPoliticalParty from "@/routes/_admin/admin/political-parties/-AddEditPoliticalParty.tsx";
import {usePoliticalPartyQuery} from "@/routes/_admin/admin/political-parties/-api-query.ts";

export const Route = createFileRoute(
  '/_admin/admin/political-parties/$partyId',
)({
  component: EditPoliticalParty,
})

function EditPoliticalParty() {
    
  const { partyId } = Route.useParams();
  const {data, isLoading, isError} = usePoliticalPartyQuery.getPartyById(partyId);
  
  if (isLoading) {
      return <> Loading .... </>
  }
  
  if (isError) {
      return <> Error .... </>;
  }
  
  return(
      <div>
          <AddEditPoliticalParty 
              isEdit = {true} 
              politicalPartyInfo={data}
          />
      </div>
  )
}
