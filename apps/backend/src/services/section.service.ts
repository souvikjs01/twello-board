import { AppError } from "../lib/error";
import { findBoardById } from "../repositories/board.repository";
import { findMembership } from "../repositories/members.repository";
import { createSectionRepo } from "../repositories/section.repository";

export async function createSectionService(userId: string, boardId: string, title: string) {
    const board = await findBoardById(boardId);

    if (!board) {
        throw new AppError(
            "Board not found",
            404,
            "BOARD_NOT_FOUND",
        );
    }

    const membership = await findMembership(userId, board.organizationId);

    if (!membership || membership.role != "ADMIN") {
        throw new AppError(
            "You are not authorized to create section",
            403,
            "NOT_ADMIN",
        );
    }

    return createSectionRepo({ title, boardId });
}