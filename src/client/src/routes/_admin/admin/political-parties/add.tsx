import { createFileRoute } from '@tanstack/react-router'
import AddEditPoliticalParty from "./-AddEditPoliticalParty.tsx";

export const Route = createFileRoute('/_admin/admin/political-parties/add')({
  component: AddPoliticalParty,
})

function AddPoliticalParty() {
  return (
      <div>
        <AddEditPoliticalParty />
      </div>
  )
}
