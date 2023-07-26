import { Request, Response } from "express";
import { userModel } from "../models";
import bcrypt from "bcryptjs";

const userController = {
  async getUsers(req: Request, res: Response) {
    try {
      let data = await userModel.find();
      // .populate({
      //   path: "user",
      //   select: ["name", "email"],
      // });
      return res.status(200).json({
        status: "success",
        message: data,
      });
    } catch (error) {
      return res.status(200).json({
        status: "failed",
        message: error.message,
      });
    }
  },
};

export default userController;
