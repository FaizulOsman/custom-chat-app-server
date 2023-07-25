/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { IChat } from "./chat.interface";
import { Chat } from "./chat.model";

// Create Chat
const createChat = async (payload: IChat): Promise<IChat | null> => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const meridiem = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedTime = `${formattedHours}:${formattedMinutes} ${meridiem}`;

  payload.time = formattedTime;

  const result = await Chat.create(payload);
  return result;
};

// Get Single Chat
const getChatByEmail = async (email: string): Promise<IChat[] | null> => {
  const result = await Chat.find({ email });
  console.log(result);
  return result;
};

export const ChatService = {
  createChat,
  getChatByEmail,
};
