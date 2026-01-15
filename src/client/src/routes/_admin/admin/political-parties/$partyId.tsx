import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_admin/admin/political-parties/$partyId',
)({
  component: EditPoliticalParty,
})

function EditPoliticalParty() {
  const { partyId } = Route.useParams();
  return(
      <div>
        Editing the party with id: {partyId}
      </div>
  )
}
