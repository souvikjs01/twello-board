import { LoginForm } from '#/components/web/auth/Loginform'
import { authClient } from '#/lib/auth-client'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();

    if (session) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='min-h-screen w-full flex items-center justify-center bg-muted/30 px-4'>
    <LoginForm />
  </div>
}

