// reference:
// https://dev.to/sneakysensei/nextjs-api-routes-global-error-handling-and-clean-code-practices-3g9p

import createError from "http-errors";
import { Response } from "express";

interface ErrorResponse {
  message: string;
  code?: number;
}

export function errorHandler(err: unknown, res: Response<ErrorResponse>) {
  // http-errors
  if (createError.isHttpError(err) && err.expose) {
    // non-exposable errors (> 500) are thrown as 500 instead
    return res.status(err.statusCode).json({
      message: err.message,
      code: err.statusCode,
    });
  }

  // default 500
  console.error(err);
  return res.status(500).json({
    message: "Internal Server Error",
    code: 500,
  });
}
