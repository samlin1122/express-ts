import { Router } from "express";
import { userController } from "../controllers";
import { verifyMiddleware } from "@/middlewares";

const userRouter = Router();

userRouter.get("/", userController.getUsers);

export default userRouter;
