import { SignupForm } from '#/components/web/auth/Signupform'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='min-h-screen w-full flex items-center justify-center bg-muted/30 px-4'>
    <SignupForm />
  </div>
}
