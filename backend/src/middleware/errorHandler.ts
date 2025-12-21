import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors.js";

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // If it's an operational error (AppError), use its status code and message
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Log unexpected errors
  console.error("Unexpected error:", err);

  // Return generic error for non-operational errors
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
}

