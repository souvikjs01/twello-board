import { authClient } from '#/lib/auth-client'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
    beforeLoad: async () => {
        const { data: session } = await authClient.getSession()

        if (!session) {
            throw redirect({
                to: '/auth/login',
            })
        }

        return {
            session,
        }
    },

    component: DashboardLayout,
})

function DashboardLayout() {
    return (
        <div>
            {/* Dashboard sidebar/header */}
            layout
            <Outlet />
        </div>
    )
}
