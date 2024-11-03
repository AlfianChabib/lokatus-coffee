import { HTTPException } from "hono/http-exception";

export const errorHandler = (error: unknown) => {
  if (error instanceof HTTPException) {
    throw new HTTPException(error.status, { message: error.message, cause: error });
  }
};
