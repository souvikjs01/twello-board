import { queryOptions } from "@tanstack/react-query";
import { fetchUserOrganizations } from "./api";

export const userOrganizationsQueryOptions = () =>
    queryOptions({
        queryKey: ["user-organizations"],
        queryFn: fetchUserOrganizations,
    });
