import type { NextFunction, Request, Response } from "express";
import {
    addOrganizationMember,
    createOrganization,
    getOrganizationMembers
} from "../services/org.service.js";
import {
    addOrganizationMemberSchema,
    createOrganizationSchema
} from "../schemas/zodSchemas.js";

export async function createOrganizationController(
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
            userId: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Organization created successfully",
            data: organization,
        });
    } catch (error) {
        next(error);
    }
}


export async function addOrganizationMemberController(
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
                message: "Invalid organization ID",
            });

            return;
        }

        const result = addOrganizationMemberSchema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Invalid request body",
                errors: result.error.flatten().fieldErrors,
            });

            return;
        }

        const membership = await addOrganizationMember(
            req.user.id,
            orgId,
            result.data.email,
        );

        res.status(201).json({
            success: true,
            message: "Member added successfully",
            data: membership,
        });
    } catch (error) {
        next(error);
    }
}

// find all the members
export async function getOrganizationMembersController(
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
                message: "Invalid organization ID",
            });

            return;
        }

        const members = await getOrganizationMembers(req.user.id, orgId);

        res.status(200).json({
            success: true,
            data: members,
        });
    } catch (error) {
        next(error);
    }
}