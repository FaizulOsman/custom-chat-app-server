/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from "express";
import { ChatService } from "./chat.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IChat } from "./chat.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

// Create Chat
const createChat: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...chatData } = req.body;
    const result = await ChatService.createChat(chatData);

    // Send Response
    sendResponse<IChat>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Chat Created Successfully",
      data: result,
    });
  }
);

// Update Chat
const updateChat: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const { ...chatData } = req.body;

    const result = await ChatService.updateChat(id, chatData);

    // Send Response
    sendResponse<IChat>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Chat Updated Successfully",
      data: result,
    });
  }
);

// Delete Chat
const deleteChat: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const result = await ChatService.deleteChat(id, verifiedUser);

    // Send Response
    sendResponse<IChat>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Chat Deleted Successfully",
      data: result,
    });
  }
);

// Get single Chat by id
const getChatByEmail: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.query;
    const e: any = email;

    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const result = await ChatService.getChatByEmail(e, verifiedUser);

    // Send Response
    sendResponse<IChat[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Get Single Chat Successfully",
      data: result,
    });
  }
);

export const ChatController = {
  createChat,
  updateChat,
  deleteChat,
  getChatByEmail,
};
