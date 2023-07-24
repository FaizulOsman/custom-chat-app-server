import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

// Routes
router.get("/my-profile", UserController.getMyProfile);

router.get("/:id", UserController.getSingleUser);

router.get("/", UserController.getAllUser);

export const UserRoutes = router;
