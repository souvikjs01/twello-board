import type { NextFunction, Request, Response } from "express";
import { AppError } from "../lib/error";

export function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.error(error);

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            code: error.code,
        });

        return;
    }

    res.status(500).json({
        success: false,
        message: "Internal server error",
        code: "INTERNAL_SERVER_ERROR",
    });
}