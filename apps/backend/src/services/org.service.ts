import * as organizationRepository from "../repositories/org.repository.js";

interface CreateOrganizationInput {
    name: string;
    description?: string;
    userId: string;
}

export async function createOrganization(
    input: CreateOrganizationInput,
) {
    return organizationRepository.createOrganization(input);
}