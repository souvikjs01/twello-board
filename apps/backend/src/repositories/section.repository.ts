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

