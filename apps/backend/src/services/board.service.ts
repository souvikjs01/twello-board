import { AppError } from "../lib/error.js";
import * as boardRepository from "../repositories/board.repository.js";
import * as membershipRepository from "../repositories/members.repository.js";

interface CreateBoardInput {
    title: string;
    description?: string;
}

export async function createBoard(
    userId: string,
    orgId: string,
    input: CreateBoardInput,
) {
    const membership =
        await membershipRepository.findMembership(
            userId,
            orgId,
        );

    if (!membership) {
        throw new AppError(
            "You are not a member of this organization",
            404,
            "NOT_FOUND",
        );
    }

    return boardRepository.createBoard({
        title: input.title,
        description: input.description,
        organizationId: orgId,
    });
}

export async function getAllOrgBoards(orgId: string, userId: string) {
    const membership =
        await membershipRepository.findMembership(
            userId,
            orgId,
        );

    if (!membership) {
        throw new AppError(
            "You are not a member of this organization",
            404,
            "NOT_FOUND",
        );
    }

    return boardRepository.findBoardsByOrganization(orgId);
}