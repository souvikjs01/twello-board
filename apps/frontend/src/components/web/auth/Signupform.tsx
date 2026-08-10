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
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "#/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signupSchema, type SignupFormType } from "#/lib/schemas";
import { Loader2 } from "lucide-react"

export function SignupForm({
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
    } = useForm<SignupFormType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: SignupFormType) => {
        setServerError(null);

        const { error } = await authClient.signUp.email({
            name: values.name,
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
                    toast.error("Signup failed", {
                        description: error.message ?? "An unexpected error occurred.",
                    });
            }
            return;
        }

        toast.success("Welcome to Plannr!", {
            description: "You have been signed in successfully.",
        });

        router.navigate({ to: "/dashboard" });
    };
    return (
        <div className={cn("w-full max-w-sm", className)} {...props} >
            <Card className="w-full">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-semibold"> Welcome to Plannr </CardTitle>
                    <CardDescription>
                        Enter your credentials to sign up to your account.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        {serverError && (
                            <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-red-400">
                                {serverError}
                            </div>
                        )}
                        <FieldGroup className="gap-5">
                            {/* Name */}
                            <Field>
                                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                <Input
                                    id="name"
                                    {...register("name")}
                                    type="text"
                                    placeholder="Alex"
                                    required
                                />
                                {errors.name && (
                                    <FieldError className="text-red-400">
                                        {errors.name.message}
                                    </FieldError>
                                )}
                            </Field>

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
                                    <FieldError className="text-red-400">
                                        {errors.email.message}
                                    </FieldError>
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
                                    <FieldError className="text-red-400">
                                        {errors.password.message}
                                    </FieldError>
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
                                            <Loader2 className="h-5 w-5 animate-spin" size={26} /> Signing up
                                        </>
                                    ) : "Sign up"}
                                </Button>
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
