import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { createIssueSchema } from "../schemas/zodSchemas.js";
import { createIssueService } from "../services/issue.service.js";

export async function createIssueController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });

            return;
        }

        const result = createIssueSchema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Invalid request body",
                errors: result.error.flatten().fieldErrors,
            });

            return;
        }

        const issue = await createIssueService(
            req.user.id,
            result.data,
        );

        res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: issue,
        });
    } catch (error) {
        next(error);
    }
}