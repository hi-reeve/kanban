import express from "express";

import { validateData } from "../../middleware/validation";
import { loginSchema, registerSchema } from "./schema";
import * as authController from "./controller"
import { authMiddleware } from "../../middleware/auth";

export const router = express.Router()

router.post("/login", validateData(loginSchema), authController.login);
router.post("/register", validateData(registerSchema), authController.register);
router.get("/me", authMiddleware, authController.me);

