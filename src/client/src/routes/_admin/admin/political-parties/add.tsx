import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/political-parties/add')({
  component: AddPoliticalParty,
})

function AddPoliticalParty() {
  return (
      <div>
        Adding the new political party
      </div>
  )
}
