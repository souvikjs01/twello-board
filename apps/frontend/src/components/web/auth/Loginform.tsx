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
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "@tanstack/react-router"
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormType } from "#/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { authClient } from "#/lib/auth-client";
import { toast } from "sonner";
import { useTransition } from "react"


export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: LoginFormType) => {
        startTransition(async () => {
            await authClient.signIn.email({
                email: values.email,
                password: values.password,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Account Logged in successfully")
                        navigate({
                            to: "/dashboard"
                        })
                    },
                    onError: ({ error }) => {
                        toast.error(error.message ?? "Something went wrong")
                    }
                }
            });
        })
    };

    return (
        <div className={cn("w-full max-w-sm", className)} {...props} >
            <Card className="w-full">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-semibold"> Welcome back </CardTitle> <CardDescription>
                        Enter your credentials to sign in to your account.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}

                    >
                        <FieldGroup className="gap-5">
                            {/* Email */}
                            <Field>
                                <FieldLabel htmlFor="email"> Email </FieldLabel>
                                <Input
                                    id="email"
                                    {...register("email")}
                                    type="email"
                                    placeholder="m@example.com"
                                    autoComplete="email"
                                    required
                                />
                                {errors.email && (
                                    <FieldError> {errors.email.message} </FieldError>
                                )}
                            </Field>

                            {/* Password */}
                            <Field>
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor="password"> Password </FieldLabel>
                                </div>
                                <Input
                                    id="password"
                                    {...register("password")}
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                />
                                {errors.password && (
                                    <FieldError> {errors.password.message} </FieldError>
                                )}
                            </Field>
                            {/* Submit */}
                            <Field>
                                <Button
                                    type="submit"
                                    className="w-full bg-[#111111] text-white"
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" size={26} /> Logging in
                                        </>
                                    ) : "Login"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account?{" "}
                                    <Link
                                        to="/auth/signup"
                                        className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                                    >
                                        Sign up
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

