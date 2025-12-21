import { Router } from "express";
import {
  createUser,
  login,
  getUser,
} from "../controllers/userController.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import {
  createUserSchema,
  loginSchema,
  getUserParamsSchema,
} from "../validations/userValidation.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// POST /api/users - Create user
router.post(
  "/",
  validateBody(createUserSchema),
  createUser
);

// POST /api/users/login - Login with phone
router.post(
  "/login",
  validateBody(loginSchema),
  login
);

// GET /api/users/:id - Get user profile (requires authentication)
router.get(
  "/:id",
  authenticate,
  validateParams(getUserParamsSchema),
  getUser
);

export default router;

