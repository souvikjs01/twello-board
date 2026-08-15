import { prisma } from "@twello/db/client";
import { MembershipRole } from "@twello/db/generated";
export type OrganizationMembership = {
    role: MembershipRole;
    org: {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
    };
};
interface CreateOrganizationRepositoryInput {
    name: string;
    description?: string;
    userId: string;
}

export async function createOrganization(
    data: CreateOrganizationRepositoryInput,
) {
    return prisma.$transaction(async (tx) => {
        const organization = await tx.organization.create({
            data: {
                name: data.name,
                description: data.description,
            },
        });

        await tx.membership.create({
            data: {
                userId: data.userId,
                orgId: organization.id,
                role: "ADMIN",
            },
        });

        return organization;
    });
}

export async function findOrganizationsByUserId(userId: string): Promise<OrganizationMembership[]> {
    return prisma.membership.findMany({
        where: { userId },
        select: {
            role: true,
            org: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    createdAt: true,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}