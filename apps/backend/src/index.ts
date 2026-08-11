import express from "express";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import apiRouter from "./routes/routes.js";
dotenv.config();

const PORT = process.env.PORT || 8001;
const app = express();
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

// IMPORTANT: Better Auth BEFORE express.json()
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/api/v1", apiRouter);

app.get("/", (req, res) => {
    res.send("Hello from http backend");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});

// POST /api/auth/sign-up/email
// POST /api/auth/sign-in/email
// POST /api/auth/sign-out