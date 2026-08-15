import { queryOptions } from "@tanstack/react-query";
import { fetchOrganizationBoard, fetchUserOrganizations } from "./api";

export const userOrganizationsQueryOptions = () =>
    queryOptions({
        queryKey: ["user-organizations"],
        queryFn: fetchUserOrganizations,
    });

export const organizationBoardQueryOptions = ({ orgId }: { orgId: string }) =>
    queryOptions({
        queryKey: ["organization-boards", orgId],
        queryFn: () => fetchOrganizationBoard(orgId),
    });