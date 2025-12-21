import { Request, Response, NextFunction } from "express";
import { verifyToken, extractTokenFromHeader } from "../utils/jwt.js";
import { UnauthorizedError } from "../utils/errors.js";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        phone: string;
      };
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      throw new UnauthorizedError("No token provided");
    }

    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(401).json({
        status: "error",
        message: error.message,
      });
    }
    return res.status(401).json({
      status: "error",
      message: "Invalid or expired token",
    });
  }
}

// Optional authentication - doesn't fail if no token
export function optionalAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    if (token) {
      const payload = verifyToken(token);
      req.user = payload;
    }
    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
}

