import { Model } from "mongoose";

export type IChat = {
  content: string;
  sender: string;
  myEmail: string;
  userEmail: string;
  name: string;
  time: string;
  reaction?: number;
};

// Chat Model
export type ChatModel = Model<IChat, Record<string, unknown>>;
