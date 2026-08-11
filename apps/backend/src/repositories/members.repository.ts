import { prisma } from "@twello/db/client";
import type { Membership } from "@twello/db/generated";

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