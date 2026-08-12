import type {
    NextFunction,
    Request,
    Response,
} from "express";
import { createSectionSchema } from "../schemas/zodSchemas";
import { createSectionService } from "../services/section.service";

export async function createSectionController(
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

        const result = createSectionSchema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Invalid request body",
                errors: result.error.flatten().fieldErrors,
            });

            return;
        }

        const section = await createSectionService(
            req.user.id,
            result.data.boardId,
            result.data.title,
        );

        res.status(201).json({
            success: true,
            message: "Section created successfully",
            data: section,
        });
    } catch (error) {
        next(error);
    }
}