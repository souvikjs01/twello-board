import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { createBoardSchema } from "../schemas/zodSchemas.js";
import { createBoard } from "../services/board.service.js";

export async function createBoardController(
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

        const { orgId } = req.params;

        if (!orgId || Array.isArray(orgId)) {
            res.status(400).json({
                success: false,
                message: "Organization ID is required",
            });
            return;
        }

        const result = createBoardSchema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Invalid request body",
                errors: result.error.flatten().fieldErrors,
            });

            return;
        }

        const board = await createBoard(
            req.user.id,
            orgId,
            result.data,
        );

        res.status(201).json({
            success: true,
            message: "Board created successfully",
            data: board,
        });
    } catch (error) {
        next(error);
    }
}