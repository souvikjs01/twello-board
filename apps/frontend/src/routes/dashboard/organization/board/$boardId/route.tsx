import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/organization/board/$boardId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { boardId } = Route.useParams();

  return <div>
    Hello "/dashboard/organization/$boardId"!
    {boardId}
  </div>
}
