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

router.patch("/:id", ChatController.updateChat);

router.delete("/:id", ChatController.deleteChat);

router.get("/", ChatController.getChatByEmail);

export const ChatRoutes = router;
