import { Button } from '#/components/ui/button'
import { signOut } from '#/lib/auth-client';
import { useNavigate } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
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

  return <div>Hello "/dashboard/"!

    <Button onClick={handleLogout}>Logout</Button>
  </div>
}
