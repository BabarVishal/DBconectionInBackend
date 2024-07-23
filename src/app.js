import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";  // Ensure this matches the package name

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());  // Ensure this matches the import

// Routes Import
import { userRouter } from "./routes/user.routes.js";
// Router declaration
app.use("/api/v1/user", userRouter);



export { app };

