import { Schema, model } from "mongoose";
import { IChat, ChatModel } from "./chat.interface";

// Chat Schema
const ChatSchema = new Schema<IChat, ChatModel>(
  {
    content: { type: String, required: [true, "content is missing!"] },
    sender: { type: String, required: [true, "sender is missing!"] },
    email: { type: String, required: [true, "email is missing!"] },
    name: { type: String, required: [true, "name is missing!"] },
    time: { type: String, required: [true, "time is missing!"] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Chat = model<IChat, ChatModel>("Chat", ChatSchema);