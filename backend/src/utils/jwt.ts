import jwt from "jsonwebtoken";
import type { JWTPayload } from "../types/index.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables");
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET!, {
    expiresIn: "7d", // Token expires in 7 days
  });
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as unknown as JWTPayload;
    if (!decoded) {
      throw new Error("Invalid or expired token");
    }
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
