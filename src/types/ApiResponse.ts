import type { httpStatusCode } from "src/utils/httpResponses/httpResponseStatusCodes";

export type ApiResponse<T> = {
  statusCode: httpStatusCode,
  body: T,
}