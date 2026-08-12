import { prisma } from "@twello/db/client";
import type { Membership } from "@twello/db/generated";
export interface OrganizationMember {
    role: "MEMBER" | "ADMIN";

    user: {
        id: string;
        name: string;
        email: string;
        image: string | null;
    };

    org: {
        name: string;
    };
}

export async function findMembership(userId: string, organizationId: string): Promise<Membership | null> {
    return prisma.membership.findUnique({
        where: {
            userId_orgId: {
                userId,
                orgId: organizationId,
            }
        },
    });
}

export async function addMemberToOrg(userId: string, organizationId: string): Promise<Membership | null> {
    return prisma.membership.create({
        data: {
            userId,
            orgId: organizationId,
            role: "MEMBER",
        },
    });
}

// fetch all users of an org
export async function findMembersByOrganization(
    organizationId: string,
): Promise<OrganizationMember[]> {
    return prisma.membership.findMany({
        where: {
            orgId: organizationId,
        },
        select: {
            role: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
            org: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}