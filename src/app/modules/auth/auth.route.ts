import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
const router = express.Router();

// Routes
router.post(
  "/signup",
  validateRequest(AuthValidation.createUserZodSchema),
  AuthController.createUser
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginUserZodSchema),
  AuthController.login
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
