import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { authClient } from '#/lib/auth-client'

export const Route = createFileRoute('/dashboard/__root')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();

    if (!session) {
      throw redirect({ to: "/auth/login" });
    }

    return { session };
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  return <Outlet />
}

