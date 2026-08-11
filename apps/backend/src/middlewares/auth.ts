import type { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth.js";

export async function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const headers = new Headers();

        for (const [key, value] of Object.entries(req.headers)) {
            if (value) {
                headers.set(key, Array.isArray(value) ? value.join(",") : value);
            }
        }

        const session = await auth.api.getSession({
            headers,
        });

        if (!session) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        req.user = session.user;

        next();
    } catch (error) {
        next(error);
    }
}