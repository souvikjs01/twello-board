import { Button } from '#/components/ui/button'
import { authClient, signOut } from '#/lib/auth-client';
import { redirect, useNavigate } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  beforeLoad: async () => {
    const { data: userSession } = await authClient.getSession();
    console.log("SESSION:", userSession);

    if (!userSession) {
      throw redirect({
        to: "/auth/login",
      });
    }

    return {
      userSession,
    };
  },

  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const { userSession } = Route.useRouteContext();
  const handleLogout = async () => {
    const { error } = await signOut();

    if (error) {
      console.error("Logout failed:", error);
      return;
    }

    navigate({
      to: "/auth/login",
    });
  };

  return <div>Hello
    {userSession.user.name}
    <Button onClick={handleLogout}>Logout</Button>
  </div>
}
