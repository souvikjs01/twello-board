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
import { Link, useRouter } from "@tanstack/react-router"
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormType } from "#/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { authClient } from "#/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";


export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginFormType) => {
        setServerError(null);

        const { error } = await authClient.signIn.email({
            email: values.email,
            password: values.password,
        });

        if (error) {
            // Map known Better Auth error codes to form fields
            switch (error.code) {
                case "INVALID_EMAIL_OR_PASSWORD":
                    setError("email", { message: "Invalid email or password" });
                    setError("password", { message: "Invalid email or password" });
                    break;
                case "USER_NOT_FOUND":
                    setError("email", { message: "No account found with this email" });
                    break;
                case "INVALID_PASSWORD":
                    setError("password", { message: "Incorrect password" });
                    break;
                case "TOO_MANY_REQUESTS":
                    setServerError("Too many attempts. Please try again later.");
                    break;
                default:
                    setServerError(error.message ?? "Something went wrong. Please try again.");
                    toast.error("Login failed", {
                        description: error.message ?? "An unexpected error occurred.",
                    });
            }
            return;
        }

        toast.success("Welcome back!", {
            description: "You have been signed in successfully.",
        });

        router.navigate({ to: "/dashboard" });
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
                            {/* Server-level error banner */}
                            {serverError && (
                                <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                    {serverError}
                                </div>
                            )}

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
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
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

