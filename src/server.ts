import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import apiRouter from "./routes";
import { errorMiddleware, verifyMiddleware } from "./middlewares";

// **** Variables **** //

const app = express();

// **** Setup **** //

// Basic middleware

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ** Front-End Content ** //
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const noAuthPaths: string[] = ["login", "signup"];

app.use("/api", verifyMiddleware(noAuthPaths), apiRouter);

// error handler
app.use(errorMiddleware);

export default app;
