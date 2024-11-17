import { QuoteTokenPayload } from "@/types/server";
import { Role } from "@prisma/client";
import { HTTPException } from "hono/http-exception";
import { JwtPayload, sign, verify, TokenExpiredError } from "jsonwebtoken";

export const signToken = (payload: { username: string; role: Role }, secret: string) => {
  return sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string, secret: string) => {
  return verify(token, secret, { algorithms: ["HS256"] }) as {
    username: string;
    role: Role;
  } & JwtPayload;
};

export const signQuoteToken = (payload: QuoteTokenPayload, secret: string) => {
  return sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};

export const verifyQuoteToken = (token: string, secret: string) => {
  try {
    return verify(token, secret, { algorithms: ["HS256"] }) as QuoteTokenPayload & JwtPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new HTTPException(401, { message: "Token expired" });
    }
  }
};
