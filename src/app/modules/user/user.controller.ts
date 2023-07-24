import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import { UserFilterableFields } from "./user.constants";
import { paginationFields } from "../../../constants/pagination";
import pick from "../../../shared/pick";

const getAllUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, UserFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await UserService.getAllUsers(filters, paginationOptions);
    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "users retrived successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await UserService.getSingleUser(id);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user retrived successfully",
      data: result,
    });
  }
);

const getMyProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    const result = await UserService.getMyProfile(user);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User's information retrieved successfully",
      data: result,
    });
  }
);

export const UserController = {
  getAllUser,
  getSingleUser,
  getMyProfile,
};
