import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@twello/db/client";
import dotenv from "dotenv";
dotenv.config();

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL!,
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: [
        "http://localhost:3000",
    ],
});