import axios from "axios";
import { BACKEND_URL } from "./auth-client";

export const api = axios.create({
    baseURL: `${BACKEND_URL}/api/v1`,
    withCredentials: true,
});

export interface Organization {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
}

export interface Board {
    id: string;
    title: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserOrganization {
    role: "MEMBER" | "ADMIN";
    org: Organization;
}

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

export async function fetchUserOrganizations(): Promise<UserOrganization[]> {
    const { data } = await api.get<ApiResponse<UserOrganization[]>>("/org/user-orgs");
    return data.data;
}

export async function createOrganization(input: {
    name: string;
    description?: string;
}): Promise<Organization> {
    const { data } = await api.post<ApiResponse<Organization>>("/org/add", input);
    return data.data;
}

export async function fetchOrganizationBoard(orgId: string): Promise<Board[]> {
    const { data } = await api.get<ApiResponse<Board[]>>(`/${orgId}/boards`);
    return data.data;
}