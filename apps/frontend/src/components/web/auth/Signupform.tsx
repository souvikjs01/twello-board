import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "@tanstack/react-router"

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("w-full max-w-sm", className)} {...props} >
            <Card className="w-full">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-semibold"> Welcome to Plannr </CardTitle> <CardDescription>
                        Enter your credentials to sign up to your account.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form>
                        <FieldGroup className="gap-5">
                            {/* Name */}
                            <Field>
                                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Alex"
                                    required
                                />
                            </Field>

                            {/* Email */}
                            <Field>
                                <FieldLabel htmlFor="email"> Email </FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    autoComplete="email"
                                    required
                                />
                            </Field>

                            {/* Password */}
                            <Field>
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor="password"> Password </FieldLabel>
                                </div>
                                <Input id="password" name="password" type="password" autoComplete="current-password" required />
                            </Field>
                            {/* Submit */}
                            <Field>
                                <Button type="submit" className="w-full bg-[#111111] text-white" > Login </Button>
                                <FieldDescription className="text-center">
                                    Already have an account?{" "}
                                    <Link to="/auth/login" className="font-medium text-foreground underline underline-offset-4 hover:text-primary" >
                                        Sign in
                                    </Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
