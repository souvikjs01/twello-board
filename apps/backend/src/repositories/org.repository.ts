import { prisma } from "@twello/db/client";

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
                role: "MEMBER",
            },
        });

        return organization;
    });
}