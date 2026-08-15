import { Button } from '#/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { userOrganizationsQueryOptions } from '#/lib/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Building2, Plus } from 'lucide-react'

export const Route = createFileRoute('/dashboard/organization/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: organizations } = useSuspenseQuery(userOrganizationsQueryOptions());
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Organizations
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your organizations and their members.
          </p>
        </div>

        <Button className=' bg-blue-500 text-white'>
          <Plus className="size-4" />
          Add organization
        </Button>
      </div>

      {/* Organizations / Empty State */}
      {organizations.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{org.org.name}</CardTitle>
                <CardDescription>
                  {org.org.description || "No description"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Organization details/actions */}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex min-h-[420px] flex-col items-center justify-center text-center">
            <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-muted">
              <Building2 className="size-6 text-muted-foreground" />
            </div>

            <h2 className="text-lg font-semibold">
              Create your first organization
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              You don't belong to any organizations yet. Create an organization
              to start managing your team and projects.
            </p>

            <Button className="mt-6">
              <Plus className="size-4" />
              Create organization
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
