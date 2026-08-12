import { Membership } from "@twello/db/generated";
import { addMemberToOrg, findMembersByOrganization, findMembership } from "../repositories/members.repository.js";
import * as organizationRepository from "../repositories/org.repository.js";
import { AddOrganizationMemberSchemaType } from "../schemas/zodSchemas.js";
import { AppError } from "../lib/error.js";

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

export async function addOrganizationMember(
    requesterId: string,
    organizationId: string,
    userId: string,
): Promise<Membership | null> {
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
            userId,
            organizationId,
        );

    if (existingMembership) {
        throw new AppError(
            "User is already a member of this organization",
            409,
            "ALREADY_MEMBER",
        );
    }

    return addMemberToOrg(userId, organizationId);
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