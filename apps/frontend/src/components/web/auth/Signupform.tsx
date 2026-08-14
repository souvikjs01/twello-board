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
import { Link } from "@tanstack/react-router"
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "#/lib/auth-client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { signupSchema, type SignupFormType } from "#/lib/schemas";
import { Loader2 } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import { useTransition } from "react"

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: SignupFormType) => {
        startTransition(async () => {
            await authClient.signUp.email({
                name: values.name,
                email: values.email,
                password: values.password,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Account signed up successfully")
                        navigate({
                            to: "/dashboard/organization"
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
                                    disabled={isPending}
                                >
                                    {isPending ? (
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
