import type { Request, Response } from "express";
import { createOrganization } from "../services/org.service.js";
import { createOrganizationSchema } from "../schemas/zodSchemas.js";


export async function createOrganizationController(req: Request, res: Response) {
    const result = createOrganizationSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            success: false,
            message: "Invalid request body",
            errors: result.error.flatten().fieldErrors,
        });

        return;
    }

    const organization = await createOrganization({
        name: result.data.name,
        description: result.data.description,
        userId: req?.user?.id!,
    });

    res.status(201).json({
        success: true,
        message: "Organization created successfully",
        data: organization,
    });
}