import { z } from "zod";

const createChatZodValidation = z.object({
  body: z.object({
    content: z.string(),
    sender: z.string(),
    email: z.string(),
    name: z.string(),
  }),
});

export const ChatValidation = {
  createChatZodValidation,
};
