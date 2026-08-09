import express from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8001;
const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})