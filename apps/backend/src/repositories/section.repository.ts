import { prisma } from "@twello/db/client";

export async function createSectionRepo(data: {
    title: string;
    boardId: string;
}) {
    return prisma.section.create({
        data: {
            title: data.title,
            boardId: data.boardId,
        },
    });
}

export async function findSectionById(
    sectionId: string,
) {
    return prisma.section.findUnique({
        where: {
            id: sectionId,
        },
        select: {
            id: true,
            boardId: true,
            board: {
                select: {
                    organizationId: true,
                },
            },
        },
    });
}
