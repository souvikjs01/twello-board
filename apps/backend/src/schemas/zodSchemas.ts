import { z } from "zod";

export const createOrganizationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Organization name is required")
        .max(100, "Organization name cannot exceed 100 characters"),

    description: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
});

export const createBoardSchema = z.object({
    title: z.string().min(2, "Board title is required").max(100),
    description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .optional()
});

export type CreateBoardSchemaType = z.infer<typeof createBoardSchema>;