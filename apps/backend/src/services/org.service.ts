import { prisma } from "@twello/db/client";

interface CreateOrganizationInput {
    name: string;
    description?: string;
    userId: string;
}

export async function createOrganization({
    name,
    description,
    userId,
}: CreateOrganizationInput) {
    const organization = await prisma.$transaction(async (tx) => {
        const organization = await tx.organization.create({
            data: {
                name,
                description,
            },
        });

        await tx.membership.create({
            data: {
                userId,
                orgId: organization.id,
                role: "MEMBER",
            },
        });

        return organization;
    });

    return organization;
}