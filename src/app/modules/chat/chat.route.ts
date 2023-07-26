import express from "express";
import { ChatController } from "./chat.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ChatValidation } from "./chat.validation";
const router = express.Router();

// Routes
router.post(
  "/",
  validateRequest(ChatValidation.createChatZodValidation),
  ChatController.createChat
);

router.get("/", ChatController.getChatByEmail);

export const ChatRoutes = router;
