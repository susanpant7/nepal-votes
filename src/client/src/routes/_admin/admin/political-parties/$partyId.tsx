import { createFileRoute } from '@tanstack/react-router'
import {
    AdminEditPoliticalPartiesPage
} from "@/features/admin/political-parties/pages/admin.political-parties.page.edit.tsx";

export const Route = createFileRoute(
  '/_admin/admin/political-parties/$partyId',
)({
  component: EditPoliticalParty,
})

function EditPoliticalParty() {
    const { partyId } = Route.useParams();
    const politicalPartyId = Number(partyId);

    return(
            <AdminEditPoliticalPartiesPage
                politicalPartyId = {politicalPartyId}
            />
    )
}