import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import { get } from "lodash";
import { errorHandler } from "./error";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(500).json({ err: err.message });
};

export const verifyMiddleware =
  (excludes: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!excludes.some((path) => req.url?.includes(path))) {
        const token = get(req, "headers.authorization", "").replace(
          "Bearer ",
          ""
        );

        if (!token) throw createError(401);
        let decoded: string | jwt.JwtPayload = "";

        if (!process.env.JWT_SECRET) {
          throw new Error("no jwt secret");
        }

        decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) throw createError(401, "no jwt secret");
      }
      next();
    } catch (err) {
      errorHandler(err, res);
    }
  };
