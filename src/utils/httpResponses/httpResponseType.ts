import type { ApiResponse } from "src/types/ApiResponse";
import { httpStatusCode } from "./httpResponseStatusCodes";

export const badRequest = (message: string): ApiResponse<string> => {
  return {
    statusCode: httpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const ok = <T>(body: any): ApiResponse<T> => {
  return {
    statusCode: httpStatusCode.OK,
    body: body,
  };
};

export const created = <T>(body: any): ApiResponse<T> => {
  return {
    statusCode: httpStatusCode.CREATED,
    body: body,
  };
};

export const internalServerError = (): ApiResponse<string> => {
  return {
    statusCode: httpStatusCode.INTERNAL_SERVER_ERROR,
    body: "Something went wrong.",
  };
};

export const cannotFound = ( body: string ): ApiResponse<string> => {
  return {
    statusCode: httpStatusCode.NOT_FOUND,
    body,
  };
};

export const conflict = <T>(message: any): ApiResponse<T> => {
  return {
    statusCode: httpStatusCode.CONFLICT,
    body: message,
  };
};