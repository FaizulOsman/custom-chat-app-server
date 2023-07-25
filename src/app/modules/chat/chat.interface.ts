import { Model } from "mongoose";

export type IChat = {
  content: string;
  sender: string;
  email: string;
  name: string;
  time: string;
};

// Chat Model
export type ChatModel = Model<IChat, Record<string, unknown>>;
