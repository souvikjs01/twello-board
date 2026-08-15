import { Membership } from "@twello/db/generated";
import { addMemberToOrg, findMembersByOrganization, findMembership } from "../repositories/members.repository.js";
import * as organizationRepository from "../repositories/org.repository.js";
import { AddOrganizationMemberSchemaType } from "../schemas/zodSchemas.js";
import { AppError } from "../lib/error.js";
import { findUserByEmail } from "../repositories/user.repository.js";

interface CreateOrganizationInput {
    name: string;
    description?: string;
    userId: string;
}

export async function createOrganization(
    input: CreateOrganizationInput,
) {
    return organizationRepository.createOrganization(input);
}

export async function getUserOrganizations(userId: string) {
    return organizationRepository.findOrganizationsByUserId(userId);
}

export async function addOrganizationMember(
    requesterId: string,
    organizationId: string,
    email: string,
): Promise<Membership | null> {
    // check if user exist or not 
    const user = await findUserByEmail(email);
    if (!user) {
        throw new AppError(
            "User not found",
            404,
            "NOT_FOUND",
        );
    }

    // Check requester membership
    const requesterMembership =
        await findMembership(
            requesterId,
            organizationId,
        );

    if (!requesterMembership) {
        throw new AppError(
            "You are not a member of this organization",
            404,
            "NOT_FOUND",
        );
    }

    // Only admins can add members
    if (requesterMembership.role !== "ADMIN") {
        throw new AppError(
            "Only organization admins can add members",
            403,
            "INSUFFICIENT_PERMISSIONS",
        );
    }

    // Check if user is already a member
    const existingMembership =
        await findMembership(
            user.id,
            organizationId,
        );

    if (existingMembership) {
        throw new AppError(
            "User is already a member of this organization",
            409,
            "ALREADY_MEMBER",
        );
    }

    return addMemberToOrg(user.id, organizationId);
}

// find all the members of an org
export async function getOrganizationMembers(
    userId: string,
    organizationId: string,
) {
    const requesterMembership = await findMembership(userId, organizationId);

    if (!requesterMembership) {
        throw new AppError(
            "You are not a member of this organization",
            403,
            "NOT_ORGANIZATION_MEMBER",
        );
    }

    return findMembersByOrganization(organizationId);
}