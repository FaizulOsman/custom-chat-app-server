/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { User } from "../user/user.model";
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
  console.log(result);
  return result;
};

// Update Chat
const updateChat = async (id: any, payload: IChat): Promise<IChat | null> => {
  // const data = await Chat.findById({ _id: id });
  const result = await Chat.findByIdAndUpdate({ _id: id }, payload);
  console.log(result);
  return result;
};

// Get Single Chat
const getChatByEmail = async (
  email: string,
  verifiedUser: any
): Promise<IChat[] | null> => {
  const myProfile = await User.findOne({ _id: verifiedUser?.id });

  const result1 = await Chat.find({
    $and: [{ myEmail: myProfile?.email }, { userEmail: email }],
  });

  const result2 = await Chat.find({
    $and: [{ myEmail: email }, { userEmail: myProfile?.email }],
  });

  const result: any = [...result1, ...result2];
  const sortedResultAsc = result.sort(
    (a: any, b: any) => a?.createdAt?.getTime() - b?.createdAt?.getTime()
  );

  return sortedResultAsc;
};

export const ChatService = {
  createChat,
  updateChat,
  getChatByEmail,
};
