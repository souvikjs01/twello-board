import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type LoginFormType = z.infer<typeof loginSchema>

export const signupSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type SignupFormType = z.infer<typeof signupSchema>

export const createOrgSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Organization name is required')
        .max(100, 'Organization name cannot exceed 100 characters'),
    description: z
        .string()
        .trim()
        .max(500, 'Description cannot exceed 500 characters')
        .optional(),
})

export type CreateOrgFormType = z.infer<typeof createOrgSchema>;