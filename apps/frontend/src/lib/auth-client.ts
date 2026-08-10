import { createAuthClient } from "better-auth/react";


export const BACKEND_URL = "http://localhost:8000";

export const authClient = createAuthClient({
    baseURL: BACKEND_URL,
});

export const { useSession, signIn, signOut, signUp } = authClient;
