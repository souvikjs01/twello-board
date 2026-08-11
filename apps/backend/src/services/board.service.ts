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
        throw new Error(
            "You are not a member of this organization",
        );
    }

    return boardRepository.createBoard({
        title: input.title,
        description: input.description,
        organizationId: orgId,
    });
}