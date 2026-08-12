import { prisma } from "@twello/db/client";
import { User } from "@twello/db/generated";

export async function findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
        where: {
            email,
        },
    })
}