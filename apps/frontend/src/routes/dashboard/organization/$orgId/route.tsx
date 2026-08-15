import { Card, CardDescription, CardHeader, CardTitle } from '#/components/ui/card';
import { organizationBoardQueryOptions } from '#/lib/queries';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react';

export const Route = createFileRoute('/dashboard/organization/$orgId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { orgId } = Route.useParams();
  const { data: boards, isLoading, isError, error } = useQuery(organizationBoardQueryOptions({ orgId }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-destructive">
        Failed to load boards: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Boards</h1>
      {boards && boards.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {boards.map((board) => (
            <Link
              key={board.id}
              to={"/dashboard/organization/board/$boardId"}
              params={{
                boardId: board.id,
              }}
            >
              <Card className="relative hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle>{board.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {board.description ?? 'No description'}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No boards found for this organization.</p>
      )}
    </div>
  );
}
