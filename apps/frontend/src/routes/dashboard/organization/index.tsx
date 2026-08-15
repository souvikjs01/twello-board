import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { createOrganization } from '#/lib/api'
import { userOrganizationsQueryOptions } from '#/lib/queries'
import { createOrgSchema, type CreateOrgFormType } from '#/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery
} from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Building2, Loader2, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/dashboard/organization/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: organizations } = useSuspenseQuery(userOrganizationsQueryOptions());
  const [dialogOpen, setDialogOpen] = useState(false)
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

        <Button
          className='bg-blue-500 text-white'
          onClick={() => setDialogOpen(true)}
        >
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

            <Button
              className="mt-6 bg-blue-500 text-white"
              onClick={() => setDialogOpen(true)}
            >
              <Plus className="size-4" />
              Create organization
            </Button>
          </CardContent>
        </Card>
      )}

      <CreateOrganizationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}

function CreateOrganizationDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateOrgFormType>({
    resolver: zodResolver(createOrgSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const { mutate: createOrg, isPending } = useMutation({
    mutationFn: createOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userOrganizationsQueryOptions().queryKey,
      })
      reset()
      onOpenChange(false)
    },
    onError: (error) => {
      console.error('Failed to create organization:', error)
    },
  })

  function onSubmit(values: CreateOrgFormType) {
    createOrg(values)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!isPending) {
          onOpenChange(next)
          if (!next) reset()
        }
      }}

    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create organization</DialogTitle>
          <DialogDescription>
            Give your organization a name and an optional description. You
            can change these later.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='name'>Name</FieldLabel>
              <Input
                id='name'
                {...register("name")}
                placeholder="Founder Inc."
                autoComplete='off'
              />
              {errors.name && (
                <FieldError className="text-red-400">
                  {errors.name.message}
                </FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor='Desc'>Description <span>(optional)</span></FieldLabel>
              <Input
                id='Desc'
                {...register("description")}
                placeholder="Description"
                autoComplete='off'
              />
              {errors.description && (
                <FieldError className="text-red-400">
                  {errors.description.message}
                </FieldError>
              )}
            </Field>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className='bg-blue-500 text-white hover:bg-blue-600'
                size={"default"}
              >
                {isPending && <Loader2 className="size-4 animate-spin" />}
                Create organization
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
