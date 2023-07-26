import { z } from "zod";

const createChatZodValidation = z.object({
  body: z.object({
    content: z.string(),
    sender: z.string(),
    myEmail: z.string(),
    userEmail: z.string(),
    name: z.string(),
  }),
});

export const ChatValidation = {
  createChatZodValidation,
};
