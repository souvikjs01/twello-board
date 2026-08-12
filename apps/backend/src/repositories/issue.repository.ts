import { prisma } from "@twello/db/client";
import { Issue, IssuePriority } from "@twello/db/generated";

export async function createIssue(data: {
    title: string;
    description?: string;
    priority: IssuePriority;
    sectionId: string;
}): Promise<Issue> {
    return prisma.issue.create({
        data,
    });
}