import { Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";

const apiRouter = Router();

apiRouter.use("/", authRouter);
apiRouter.use("/user", userRouter);

export default apiRouter;
