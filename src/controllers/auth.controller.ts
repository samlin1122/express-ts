import { Request, Response } from "express";
import { userModel } from "../models";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";

const signJWT = async (payload: any, expiresIn = "1 day") => {
  if (!process.env.JWT_SECRET) {
    throw new Error("no jwt secret");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_DAY || expiresIn,
  });
};

const authController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({
          status: "failed",
          message: "not existed",
        });
      }
      const passwordCheck = await compare(password, user.password);

      if (!passwordCheck) {
        return res.status(400).json({
          status: "failed",
          message: "password incorrect",
        });
      }
      const token = await signJWT({ id: user._id });
      return res.status(200).json({
        status: "success",
        data: {
          user: user.name,
          token,
        },
      });
    } catch (error) {
      return res.status(200).json({
        status: "failed",
        message: error.message,
      });
    }
  },
  async signup(req: Request, res: Response) {
    try {
      let { name, email, password } = req.body;
      // verify body data first

      const BCRYPT_SALT = process.env.BCRYPT_SALT || 12;
      const payload = {
        name,
        email,
        password: password && (await hash(password, 12)),
      };
      console.log({ payload });

      let data = await userModel.create(payload);

      return res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      return res.status(200).json({
        status: "failed",
        message: error.message,
      });
    }
  },
};

export default authController;
