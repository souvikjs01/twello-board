import { IssuePriority } from "@twello/db/generated";
import { findSectionById } from "../repositories/section.repository";
import { AppError } from "../lib/error";
import { findMembership } from "../repositories/members.repository";
import { createIssue } from "../repositories/issue.repository";

interface CreateIssueInput {
    title: string;
    description?: string;
    priority: IssuePriority;
    sectionId: string;
}

export async function createIssueService(
    userId: string,
    input: CreateIssueInput,
) {
    const section =
        await findSectionById(input.sectionId);

    if (!section) {
        throw new AppError(
            "Section not found",
            404,
            "SECTION_NOT_FOUND",
        );
    }

    const membership =
        await findMembership(
            userId,
            section.board.organizationId,
        );

    if (!membership) {
        throw new AppError(
            "You are not a member of this organization",
            403,
            "NOT_ORGANIZATION_MEMBER",
        );
    }

    return createIssue({
        title: input.title,
        description: input.description,
        priority: input.priority,
        sectionId: input.sectionId,
    });
}