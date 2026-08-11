import { prisma } from "@twello/db/client";

export async function createBoard(data: {
    title: string;
    description?: string;
    organizationId: string
}) {
    return prisma.board.create({
        data: {
            title: data.title,
            description: data.description,
            organizationId: data.organizationId,
        },
    });
}

export async function findBoardById(id: string) {
    return prisma.board.findUnique({
        where: {
            id,
        },
    });
}

export async function findBoardsByOrganization(
    organizationId: string,
) {
    return prisma.board.findMany({
        where: {
            organizationId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}